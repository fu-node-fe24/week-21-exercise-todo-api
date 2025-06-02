import Todo from '../models/todo.js';

export async function getAllTodos() {
    try {
        const todos = await Todo.find();  
        if(todos) {
            throw new Error('No todos found');
        }      
        return todos;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function getTodosByUserId(userId) {
    try {
        const todos = await Todo.find({ userId : userId });
        if(!todos) {
            throw new Error('No todos found for this user');
        }
        return todos;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function addNewTodo(todo) {
    try {
        const result = await Todo.create(todo);
        if(!result) {
            throw new Error('Todo could not be created');
        }
        return result;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function updateTodo(todoId) {
    try {
        const todo = await Todo.findById(todoId);
        if(!todo) {
            throw new Error('Todo not found');
        }
        todo.done = !todo.done;
        const result = await todo.save();
        return result;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function deleteTodo(todoId) {
    try {
        const result = await Todo.findByIdAndDelete(todoId);
        if(!result) {
            throw new Error('Todo not found');
        }
        return result;
    } catch(error) {
        console.log(error);
        return null;
    }
}