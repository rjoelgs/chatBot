const express = require("express");
const apiruta = require("./routes/ruta");


const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.use("/api", apiruta);

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

