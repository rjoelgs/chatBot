const express = require("express");
const router = express.Router();
const apicontroller = require("../controller/apicontroller");

router.get("/verificar", apicontroller.verificar);

router.post("/recibir", apicontroller.recibir);



module.exports = router;


