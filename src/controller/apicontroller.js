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
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages;
  
        const message = messages[0];
        console.log(message)
        const from = message.from;
        const text = message.text?.body;

        // console.log(from);
        // console.log(text);

        sendMessage(from, text);
        res.send("EVENT_RECEIVED");

    } catch (e) {
        console.error("Error handling webhook:", e);
        res.send("EVENT_RECEIVED");
    }
};

module.exports = { verificar, recibir };




