import React from "react";
import { API_URL } from 'react-native-dotenv'

// 이메일 검증 API, 코드 확인 API

const SignUp = async param => {
    const response = await fetch(`${API_URL}/signup`, {
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
    const response = await fetch(`${API_URL}/login`, {
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
