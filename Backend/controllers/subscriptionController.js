const Subscription = require("../models/Subscription");


// Add Subscription Plan
const addSubscription = async (req,res)=>{
    try{

        const subscription = await Subscription.create(req.body);

        res.status(201).json({
            message:"Subscription Added Successfully",
            subscription
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


// Get All Subscription Plans
const getSubscriptions = async(req,res)=>{
    try{

        const subscriptions = await Subscription.find();

        res.status(200).json(subscriptions);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


module.exports = {
    addSubscription,
    getSubscriptions
};