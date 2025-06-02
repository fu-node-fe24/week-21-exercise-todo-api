import { v4 as uuid } from 'uuid';

export function createNewUser(user) {
    return {
        ...user,
        userId : uuid().substring(0, 5)
    }
}

export function createNewTodo(todo) {
    return {
        ...todo,
        done : false,
        userId : global.user.userId
    }
}