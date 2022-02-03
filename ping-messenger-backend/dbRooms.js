import mongoose from 'mongoose';

// const messageScheema = mongoose.Schema({
//     messageText: String,
//     name: String,
//     timestamp: String,
//     sender: String
// });

const roomSchema = mongoose.Schema({
    roomName: String
    // messages: [messageScheema]
    
});

export default mongoose.model('room', roomSchema);