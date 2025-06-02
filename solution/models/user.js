import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minlength : 6
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    userId : {
        type : String,
        required : true,
        unique : true
    }
});

const User = mongoose.model('User', userSchema);

export default User;