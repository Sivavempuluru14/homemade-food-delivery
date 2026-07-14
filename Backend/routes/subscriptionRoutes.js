const express = require("express");

const router = express.Router();


const {
    addSubscription,
    getSubscriptions
} = require("../controllers/subscriptionController");



router.post("/", addSubscription);


router.get("/", getSubscriptions);



module.exports = router;