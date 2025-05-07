const https = require("https");

const sendMessage = (from, text) => {
    try {
        const data = JSON.stringify({
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": "526181387485",
            "type": "text",
            "text": {
                "preview_url": false,
                "body": "hello world"
            }
        });

        const options = {
            host: "graph.facebook.com",
            path: "/v22.0/683869301467202/messages",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "EAAPrKD01YIoBOzzazs6bFvLAKZAXxSGNiayzS5xZByZCyzJYhdNlTTSzghhoZCpeAiiZART7KOMuSWqZBdo7QjmJHVO4e51R5YMzzjr9nzNa0joV4aTIUMjlaOZB27xIsEEI1dCJfZBsjB0FArO0cmgqzdDawzh1AOf0AwVadyW1e2nF0oIcCZCHGouKk77ahFipIcVZBFf7irRQ3cEnosWZB9ZCXfNl"
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on("data", (d) => {
                responseData += d;
            });

            res.on("end", () => {
                console.log('Respuesta del servidor:', responseData);
            });
        });

        req.on('error', (error) => {
            console.error('Error en la petición HTTP:', error.message);
        });

        req.write(data);
        req.end();
    } catch (error) {
        console.error('Error al enviar el mensaje:', error.message);
        throw error; // Re-lanzamos el error para que pueda ser manejado por el código que llama a esta función
    }
};

module.exports = { sendMessage };