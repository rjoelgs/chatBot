const { sendMessage } = require("../service/apiservice");

const verificar = (req, res) => {
    try {
        let tokenCode = "UNDERTOKEN";
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token === tokenCode) {
            res.send(challenge);
        } else {
            res.send("Error");
        }
        
        console.log(req);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al verificar");
    }
};

const recibir = (req, res) => {
    try {
        console.log("Webhook payload:", req.body);

        // Caso 1: payload con entry (estructura de WhatsApp Business API)
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages;

        if (messages && Array.isArray(messages) && messages.length > 0) {
            const message = messages[0];
            const from = message.from;
            const text = message.text?.body;
            console.log("from:", from, "text:", text);
            sendMessage(from, text);
            return res.send("EVENT_RECEIVED");
        }

        // Caso 2: payload directo (como el que mostraste en tu log)
        if (req.body.from && req.body.text?.body) {
            const from = req.body.from;
            const text = req.body.text.body;
            console.log("from:", from, "text:", text);
            sendMessage(from, text);
            return res.send("EVENT_RECEIVED");
        }

        // Si no coincide ninguna estructura
        console.error("Estructura de payload no reconocida:", req.body);
        res.send("EVENT_RECEIVED");

    } catch (e) {
        console.error("Error handling webhook:", e);
        res.send("EVENT_RECEIVED");
    }
};

module.exports = { verificar, recibir };




