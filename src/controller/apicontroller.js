const verificar = (req, res) => {
    res.send("verificar");
    console.log("verificar");
}

const recibir = (req, res) => {
    res.send("recibir");
    console.log("recibir");
}

module.exports = {verificar, recibir};


