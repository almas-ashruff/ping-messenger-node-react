// import modules
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Rooms from './dbRooms.js';
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// app configs
const app = express();
const port = process.env.PORT || 4402;


// middleware
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
}); // Accepts messages from everywhere 
app.use(cors());

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap2",
    useTLS: true    
  });



// db config
const connection_url = process.env.PING_DB_URL;

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const rooms_connection_url = process.env.ROOMS_DB_URL;

const db = mongoose.connection;




db.once("open", () => {
    console.log("DB connected..");

    const msgCollection = db.collection("messagecontents"); // !!!plural
    const roomsCollection = db.collection("rooms"); // !!!plural

    const changeStream = msgCollection.watch();
    const roomsChangeStream = roomsCollection.watch();


    changeStream.on('change', (change) => {
        console.log("A message was sent", change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else { // if change operation fails to insert
            console.log('Error trigerring pusher');
        }
    });

    roomsChangeStream.on('change', (change) => {
        console.log("A new room was created", change);

        if(change.operationType === 'insert') {
            const roomsDetails = change.fullDocument;
            pusher.trigger('rooms', 'inserted', {
                name: roomsDetails.roomName
            });
        } else { // if change operation fails to insert
            console.log('Error trigerring pusher');
        }
    });
});

// api routes

app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => { //gets back all the messages
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});



app.get('/rooms/sync', (req, res) => {
    Rooms.find((err, data) => { //gets back all the messages
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});


app.post('/messages/new', (req, res) => { // posts a new message in the db
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err) // 500 -> internal server error
        } else {
            res.status(201).send(`New message created: \n ${data}`);
        }
    });
});


app.post('/rooms/new', (req, res) => { // posts a new message in the db
    const dbRooms = req.body;

    Rooms.create(dbRooms, (err, data) => {
        if(err) {
            res.status(500).send(err) // 500 -> internal server error
        } else {
            res.status(201).send(`New message created: \n ${data}`);
        }
    });
});


// listen
app.listen(port, () => console.log(`Server active on localhost: ${port}`));