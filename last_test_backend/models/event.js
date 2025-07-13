import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    image: String,
    startTime: Date,
    endTime: Date,
    isLocked: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
