import express from 'express';
import path from 'path';
import client from './client.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {

    client.GetAll(null, (err, data) => {
        if (!err) {
            console.log("DATA: " + JSON.stringify(data));
            res.send(data);
        } else {
            console.log("ERROR: " + err);
            res.status(500).send({
                msg: "Error"
            });
        }
    })
    
});

app.post('/addClient', (req, res) => {
    const user = req.body;
    client.GetAll(user, (err, data) => {
        if (!err) {
            console.log("DATA: " + JSON.stringify(data));
            res.send(data);
        } else {
            console.log("ERROR: " + err);
            res.status(500).send({
                msg: "Error"
            });
        }
    })
    
});


app.listen(5555, () => {
    console.log("SERVER STARTED!");
})