import React from "react";
import { Link } from "react-router-dom";

export default function () {
    return <div>
        <div><Link to={"/user-signin"}>User - signin</Link></div>
        <div><Link to={"/store-signin"}>Store - signin</Link></div>
    </div>
}