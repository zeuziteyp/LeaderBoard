const sql = require("./db.js");

const {
    v4: uuidv4,
} = require("uuid");

const Order = function(order){
    this.user_id = uuidv4();
    this.nick = order.nick;
    this.level = order.level;
    this.point = order.point;
    this.create_date = new Date();
    this.game_id = order.game_id;
}

Order.createOrder = (newOrder, result) =>{
    sql.query("INSERT INTO orders SET ?",newOrder, (err,res)=>{
        const mediumOrder = new Order({
            nick: newOrder.nick,
            level: "medium",
            point: "0",
            game_id: newOrder.game_id
        });
        const easyOrder = new Order({
            nick: newOrder.nick,
            level: "easy",
            point: "0",
            game_id: newOrder.game_id
        });
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        else{
            sql.query("INSERT INTO orders SET ?",mediumOrder, (err,res)=>{
                if(err){
                    console.log(err);
                    result(err,null);
                    return;
                }
                else{
                    sql.query("INSERT INTO orders SET ?",easyOrder, (err,res)=>{
                        if(err){
                            console.log(err);
                            result(err,null);
                            return;
                        }
                        else{
                            result(null,newOrder);
                        }
                    });
                }
            });
        }
    });
}

Order.findOrder = (user_id,level,game_id, result) =>{
    sql.query(`
    SELECT 
    COUNT(*) as user_order
FROM 
    orders
WHERE 
    point > (SELECT point FROM orders WHERE user_id = "${user_id}" and level="${level}" and game_id="${game_id}")`,(err,res)=>{
        if(err){
            result(err,null);
            return;
        }
        else{
            result(null,res[0]);
        }
    });
}
Order.findNick = (nick,game_id,result) =>{
    sql.query(`Select nick FROM orders WHERE nick="${nick}" and game_id="${game_id}"`,(err,res)=>{
        if(err){
            result(err,null);
            return;
        }
        else{
            if(res.length > 0 ){
                result(null,{status:false});
            }
            else{
                result(null,{status:true});
            }
        }
    });
}

Order.findTop = (level,game_id, result) =>{
    sql.query(`Select * FROM orders WHERE level="${level}" and game_id="${game_id}" ORDER BY point DESC LIMIT 3;`,(err,res)=>{
        if(err){
            result(err,null);
            return;
        }
        else{
            result(null,{first:res[0],second:res[1],third:res[2]});
        }
    });
}

Order.updateOrder = (point,level,game_id,user_id, result) =>{
    sql.query(`UPDATE orders SET point=? WHERE user_id=? and level=? and game_id=?`,[point,user_id,level,game_id], (err,res)=>{
        if(err){
            result(err,null);
            return;
        }
        else{
            result(null,res);
        }
    });
}

module.exports = Order;