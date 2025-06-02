import { application, Router } from 'express';
import { getAllTodos, addNewTodo, getTodosByUserId, updateTodo, deleteTodo } from '../services/todos.js';
import { authorizeKey, authorizeUser } from '../middlewares/authorize.js';
import { createNewTodo } from '../utils/index.js';

const router = Router();

router.use(authorizeKey);

router.get('/', async (req, res, next) => {
    const todos = await getAllTodos();
    if(todos) {
        res.json({
            success : true,
            todos : todos
        });
    } else {
        next({
            status : 404,
            message : 'Could not fetch todos'
        });
    }
});

router.get('/:userId', async (req, res, next) => {
    const todos = await getTodosByUserId(req.params.userId);
    if(todos) {
        res.json({
            success : true,
            todos : todos
        });
    } else {
        next({
            status : 404,
            message : 'Could not fetch todos for this user'
        });
    }
});

router.post('/', authorizeUser, async (req, res, next) => {
    const result = await addNewTodo(createNewTodo(req.body));
    if(result) {
        res.status(201).json({
            success : true,
            message : 'Todo created successfully',
            todo : result
        });
    } else {
        next({
            status : 400,
            message : 'Todo could not be created'
        });
    }
});

router.put('/:todoId', authorizeUser, async (req, res, next) => {
    const result = await updateTodo(req.params.todoId);
    if(result) {
        res.json({
            success : true,
            message : 'Todo updated successfully',
            todo : result
        });
    } else {
        next({
            status : 404,
            message : 'Todo could not be updated'
        });
    }
});
router.delete('/:todoId', authorizeUser, async (req, res, next) => {
    const result = await deleteTodo(req.params.todoId);
    if(result) {
        res.json({
            success : true,
            message : 'Todo deleted successfully'
        });
    } else {
        next({
            status : 404,
            message : 'Todo could not be deleted'
        });
    }
});

export default router;