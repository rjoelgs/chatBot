const https = require("https");

const sendMessage = (from, text) => {
    const data = JSON.stringify({
        from: from,
        text: text
    });

    const options = {
        hostname: "chatbot-hv00.onrender.com",
        path: "/v1/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "EAAPrKD01YIoBOylWyZAxGyriB6jZCZBqJuRq698EPZCwo8Bl8NCPO7U4UZBGtZBXnFZBG15eLQ33jsSTZCX16jC7OsosqzILNZBmwZCPg6bbsVMnJFbYd20OdYFzQoVKBGWmSSxSZCJIkEExBbb0JyMIW7rQ0rIzyez1P72MZBKdHNMqgXBOzBodhG9zcmc376YpjsuG33uccim95ReViGi4Jt144AYy"
        }
    };

    const req = https.request(options, (res) => {
        res.on("data", (d) => {
            process.stdout.write(d);
        });
    });


    req.write(data);
    req.end();
}

module.exports = { sendMessage };
