const https = require("https");

const sendMessage = (from, text) => {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "526181387485",
        "type": "text",
        "text": {
            "preview_url": false,
            "body": "hola esta es mi primer respuesta"
        }
    });

    const options = {
        host: "graph.facebook.com",
        path: "/v22.0/683869301467202/messages",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "EAAPrKD01YIoBO5A23oZBMEmbOGBOVqU3oPZA2MDm0eddhaXEZAvF2exllJ1s66MdZARZCdPQPKL6SE9jJiDsvSw1XX1qg0TgG0jQZAa6wtMWNtkSyy5rNKSdcERIjHpJMxpzZBUeUNxEPzFmTXXoVjwcoRRtdzZBqxZARAZBj2JYOel4JJtNDSghOl63LJuXEWxeZCYcREClPnLibx6Hr8ZByP4ys6zB"
        }
    };

    const req = https.request(options, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
        });
       
    });

    

    req.write(data);
    req.end();
};

module.exports = { sendMessage };