const https = require("https");

const sendMessage = (from, text) => {
    const data = JSON.stringify({
        from: from,
        text: text
    });

    const options = {
        hostname: "chatbot-hv00.onrender.com",
        path: "/api",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "EAAPrKD01YIoBO5A23oZBMEmbOGBOVqU3oPZA2MDm0eddhaXEZAvF2exllJ1s66MdZARZCdPQPKL6SE9jJiDsvSw1XX1qg0TgG0jQZAa6wtMWNtkSyy5rNKSdcERIjHpJMxpzZBUeUNxEPzFmTXXoVjwcoRRtdzZBqxZARAZBj2JYOel4JJtNDSghOl63LJuXEWxeZCYcREClPnLibx6Hr8ZByP4ys6zB"
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
