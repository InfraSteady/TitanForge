const express = require("express");
const agentDataRetrievalController = require("../controller/agentDataRetrivalController");
const router = new express.Router();

router.post("/agent_data_retrival", agentDataRetrievalController);

module.exports = router;
