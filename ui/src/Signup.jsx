import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Request from "./Request";
import "./style/signin.css";


export default class Signin extends React.Component {

    state = {
        showPassword: false,
        email: "",
        pwd: "",
        phoneno:"",
        cpwd:"",

    }

    toggleShowPassword = () => this.setState({ showPassword: !this.state.showPassword });

    setEmail = (e) => this.setState({ email: e.target.value });

    setPassword = (e) => this.setState({ password: e.target.value });

    handleSignin = (e) => {
        e.preventDefault();
        Request.post(this.props.url, {
            email: this.state.email,
            pwd: this.state.password
        }).then(() => location.replace(this.props.redirectTo)).catch(err => toast.error(err.message))
    }

    render() {
        return <div className="signin-container">
            <form className="signin" id="signin-form" onSubmit={this.handleSignin}>
                <div className="head group">
                    <img src="../assets/images/logo.png" alt="logo" width="200px" />
                    <p>Sign Up To Continue</p><br /><br />
                </div>

                <div className="group">
                    <label htmlFor="email-field">Email</label><br />
                    <input type="email" name="email" id="username-field" required onChange={this.setInput()} />
                </div>
                <div className="group">
                    <label htmlFor="user-field">Email</label><br />
                    <input type="number" name="phoneno" id="phoneno-field" required onChange={this.setInput()} />
                </div>

                <div className="group">
                    <label htmlFor="cpassword-field">Password</label><br />
                    <input type={this.state.showPassword ? "text" : "password"} name="cpwd" id="cpassword-field" required onChange={this.setInput} />
                    <span onClick={this.toggleShowPassword}><i className={"field-icon fa-solid fa-eye" + (this.state.showPassword ? "-slash" : "")}></i></span>
                </div>


                <div className="group">
                    <label htmlFor="password-field">Password</label><br />
                    <input type={this.state.showPassword ? "text" : "password"} name="pwd" id="password-field" required onChange={this.setInput} />
                    <span onClick={this.toggleShowPassword}><i className={"field-icon fa-solid fa-eye" + (this.state.showPassword ? "-slash" : "")}></i></span>
                </div>

                <div className="group forgot-pass-link">
                    <a href="#">Forget Password?</a>
                </div>

                <div className="group">
                    <button id="submit"><span>Login</span></button>
                </div>

                <div className="group sign-up-link">
                    <p>Existing User? <Link to="/user-signin">Signin</Link></p>
                </div>
            </form>
        </div>
    }
}