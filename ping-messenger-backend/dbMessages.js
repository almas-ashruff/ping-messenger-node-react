import mongoose from 'mongoose';

const pingSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

export default mongoose.model('messageContent', pingSchema);