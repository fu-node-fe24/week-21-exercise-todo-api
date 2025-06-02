import User from '../models/user.js';

export async function getUser(username) {
    try {
        return await User.findOne({username : username});
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function registerUser(user) {
    try{
        return await User.create(user);
    } catch(error) {
        console.log(error);
        return null;
    }
}