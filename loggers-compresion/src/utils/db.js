import mongoose from 'mongoose';

const connect = async ()=>{
    await mongoose.connect('mongodb+srv://jere:NsXUP8ie6vndjhpv@cluster0.2tmx7hc.mongodb.net/?retryWrites=true&w=majority')
};

export default connect;