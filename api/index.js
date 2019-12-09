import React from "react";
import { API_URL } from "react-native-dotenv";

const fetchPost = async ({ url = API_URL, code, param }) => {
    const response = await fetch(`${url}/${code}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    });

    return response.json();
};

const SignUp = async param => {
    return fetchPost({ code: "signup", param });
    // const response = await fetch(`${API_URL}/signup`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(param)
    // });

    // return response.json();
};
const SignIn = param => {
    return fetchPost({ code: "login", param });
    // const response = await fetch(`${API_URL}/login`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(param)
    // });

    // return response.json();
};

const EmailVal = async param => {
    const response = await fetch(`${API_URL}/mail`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    });

    return response.json();
};

const CodeVal = async param => {
    const response = await fetch(`${API_URL}/cert/mail`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    });

    return response.json();
};

export { SignUp, SignIn, EmailVal, CodeVal };
