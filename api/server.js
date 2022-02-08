// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();

const userModel = require('./users/model');

server.use(express.json());

server.get('/', (req, res) => {
    console.log('received get request');
    res.json("hello worlds");
});

server.get('/api/users', (req, res) => {
    userModel.find()
        .then(resp => {
            res.json(resp);
        }).catch(() => {
            res.status(500).json({ message: "could not get users :{ "})
        });
});

server.get('/api/users/:id', (req, res) => {
    let { id } = req.params;
    userModel.findById(id)
        .then(user => {
            console.log(user);
            if(user == null){
                res.status(404).json({ message: `user ${id} not found`})
            } else {
                res.json(user);
            }
        }).catch(() => {
            res.status(500).json({ message: 'could not get user'})
        });
});

server.post('/api/users', (req, res) => {
    let body = req.body
    if(!body.name){
        res.status(500).json({ message: "name is req"})
    }else if (!body.bio){
        res.status(500).json({ message: "bio is req"})
    }

    userModel.insert(body)
        .then(user => {
            res.status(201).json(user);
        }).catch(() => {
            res.status(500).json({ message: "could not create user!"});
        });
});

server.put('/api/users/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let user = await userModel.findById(id);
        if(user == null){
            res.status(404).json({ message: `user ${id} not found`});
            return;
        }
        let body = req.body;
        if(!body.name){
            res.status(500).json({ message: "name is req"})
            return;
        }else if (!body.bio){
            res.status(500).json({ message: "bio is req"})
            return;
        } else {
            let newUser = await userModel.update(id, body);
            console.log(newUser);
            res.status(200).json(newUser)
        }
    } catch(e){
        res.status(500).json({ message: 'could not update user '});
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
