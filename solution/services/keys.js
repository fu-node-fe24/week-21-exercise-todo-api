import Key from '../models/key.js';

export async function getRandomKey() {
    try {
        const keys = await Key.find();
        const key = keys[Math.floor(Math.random() * keys.length)];
        
        if(!key) {
            throw new Error('No key found!');
        }
        return key;
    } catch(err) {
        return null;
    }
}

export async function isKeyInDatabase(key) {
    try {
        const keyExists = await Key.exists({ key : key });
        if(keyExists) {
            return true;
        } else throw new Error();
    } catch {
        return false;        
    }
}