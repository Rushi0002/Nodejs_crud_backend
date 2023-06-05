const dbConnect = require("./mongodb");
const mongodb = require("mongodb");
const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/books',async (req,resp)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    resp.send(data);
});

app.get('/books/:id',async (req,resp)=>{
    let data = await dbConnect();
    data = await data.find({_id:new mongodb.ObjectId(req.params.id)}).toArray();
    resp.send(data);
});

app.post('/books',async (req,resp)=>{
    let data = await dbConnect();
    data = await data.insertOne(req.body);
    resp.send(data);
});

app.put('/books/:id',async (req,resp)=>{
    let data = await dbConnect();
    data = data.updateOne(
        {_id:new mongodb.ObjectId(req.params.id)},
        {$set:req.body}
    )
    resp.send({result:"updated"});
});

app.delete('/books/:id',async (req, resp)=> {
    let data = await dbConnect();
    data = await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)});
    resp.send(data);
});

app.listen(5000);