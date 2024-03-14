module.exports = app => {
    const Order = require("../controllers/order.controller.js");

    var router = require("express").Router();

    router.post("/createOrder",Order.createOrder);

    router.get("/findOrder/:user_id/:level/:game_id",Order.findOrder);

    router.get("/findNick/:nick/:game_id",Order.findNick);

    router.get("/findTop/:level/:game_id",Order.findTop);

    router.post("/updateOrder",Order.updateOrder);

    app.use('/api/v1/order',router);
}