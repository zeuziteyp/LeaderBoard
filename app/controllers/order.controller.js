const Order = require("../models/order.models.js");

exports.createOrder = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }

    const order = new Order({
        nick: req.body.nick,
        level: req.body.level,
        point: req.body.point,
        game_id: req.body.game_id
    });

    Order.createOrder(order,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "baboş bi problem var. modelden hata döndü"
            })
        }
        else{
            res.send(data);
        }
    })
}

exports.findOrder = (req,res) =>{
    Order.findOrder(req.params.user_id,req.params.level,req.params.game_id,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "baboş bi problem var. modelden hata döndü"
            })
        }
        else{
            res.send(data);
        }
    })
}

exports.findNick = (req,res) =>{

    Order.findNick(req.params.nick,req.params.game_id,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "baboş bi problem var. modelden hata döndü"
            })
        }
        else{
            res.send(data);
        }
    })
}

exports.findTop = (req,res) =>{

    Order.findTop(req.params.level,req.params.game_id,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "baboş bi problem var. modelden hata döndü"
            })
        }
        else{
            res.send(data);
        }
    })
}

exports.updateOrder = (req,res) =>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        })
    }

    Order.updateOrder(req.body.point,req.body.level,req.body.game_id,req.body.user_id,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "baboş bi problem var. modelden hata döndü"
            })
        }
        else{
            res.send(data);
        }
    })
}