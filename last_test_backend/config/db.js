import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Kết nối ok tới mongoDB');
    } catch (err) {
        console.error('Ko kết nối đc tới mongodb', err.message);
        process.exit(1);
    }
};

export default connectDB;
