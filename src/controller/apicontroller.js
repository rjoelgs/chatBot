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
    
    try{
        let entry = req.body.entry[0];
        let changes = entry.changes[0];
        let value = changes.value;
        let message = value.message;
        let from = message.from;

        console.log(from);
        console.log(message);
        res.send("EVENT_RECEIVED");
    }catch(e){
        console.log(e);
        res.send("EVENT_RECEIVED");
    }
    
};

module.exports = { verificar, recibir };




