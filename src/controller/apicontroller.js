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
        console.log("Incoming body:", JSON.stringify(req.body, null, 2));

        let from, text;

        // Try webhook format
        const entry = req.body?.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages;

        if (messages?.[0]) {
            from = messages[0].from;
            text = messages[0].text?.body;
        } else if (req.body.from && req.body.text) {
            // Fallback to simple test format
            from = req.body.from;
            text = req.body.text;
        } else {
            console.log("Unrecognized format");
            return res.send("EVENT_RECEIVED");
        }

        console.log("From:", from);
        console.log("Text:", text);

        sendMessage(from, text);
        res.send("EVENT_RECEIVED");

    } catch (e) {
        console.error("Error handling webhook:", e);
        res.send("EVENT_RECEIVED");
    }
};

module.exports = { verificar, recibir };




