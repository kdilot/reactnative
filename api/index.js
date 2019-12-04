import React from "react";
const url = "http://192.168.10.33:3000";

const SignUp = async param => {
    const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    });

    return response.json();
};
const SignIn = async param => {
    const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    });

    return response.json();
};

export { SignUp, SignIn };
