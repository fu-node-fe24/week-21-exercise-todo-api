import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    task : {
        type : String,
        required : true,
        unique : true,
        minlength : 3
    },
    done : {
        type : Boolean,
        required : true
    },
    userId : {
        type : String,
        required : true
    }
}, {timestamps : true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;