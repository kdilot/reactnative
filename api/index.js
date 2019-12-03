import React from "reeact";

const url = "";
const requestCode = async () => {
    try {
        return await fetch(url, {
            // method: "POST",
            // headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify({
            //     firstParam: "yourValue",
            //     secondParam: "yourOtherValue"
            // })
        }).then(res => {
            console.log(res);
        });
    } catch (e) {
        console.error(e);
    }
};

export { requestCode };
