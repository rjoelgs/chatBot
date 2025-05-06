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
            "Authorization": "EAAPrKD01YIoBOz8kI86QUsjABzIiZCzoRAmQ7wB4ncfstKb2QeMwJ5euzDKPqzbXH45PeIBMNUTCfeWfZAZApIyIhE46KhWhWODEES8vj9zLtL3PVjXOmkiCXsT2DURejnpLLEvrCurK5k6HZBnBDgmYfZBIhV5tzZAZAlZCqEnR9vEhzLJyI7xdkrGhoj6btmjyJdUZCtd0sPVZAMWfkDpuRtC9YK"
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