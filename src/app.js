const express = require("express");
const app = express();
const agentDataRetrivalRouter = require("./router/agentDataRetrievalRouter.js");
require("dotenv").config();

app.use(express.json());

app.use(agentDataRetrivalRouter);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
