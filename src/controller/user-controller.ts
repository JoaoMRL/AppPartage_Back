import { Router } from "express";
import Joi from "joi";
import bcrypt from 'bcrypt';
import {userRepository} from '../repository/user-repository';
import { checkId } from "../middleware";

export const userController = Router();
userController.get('/api/user', async (req,res) => {
    const user = await userRepository.findAll();
    res.json(user);
    return;
});
userController.get('/api/OneUser/:name', async (req,res) => {
    const user = await userRepository.findByName(req.params.name);
    res.json(user);
    return;
});
userController.get('/api/user/:id',checkId, async (req,res) => {
    
    const user = await userRepository.findById(req.params.id);
    if(!user) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(user);
});
// Insert un User dans la bdd
userController.post('/api/user',async(req,res)=>{

    const validation = userValidation.validate(req.body,{abortEarly:false});
    //Si la req du body ne correspond pas a ce qu'on attend
    if (validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    //Si un user est déja présent
    if(await userRepository.findByName(req.body.name)){
        res.status(400).json({error:'User AlreadyExist'});
        return;
    }
    req.body.role='ROLE_USER';
    req.body.password=await bcrypt.hash(req.body.password,10);
    const user = await userRepository.insert(req.body);
    res.status(201).json(user);
});

userController.delete('/user/:id',checkId, async(req,res)=>{
    await userRepository.remove(req.params.id);
    res.status(204).end();
})

userController.patch('/user/:id',checkId,async (req,res) => {

    const validation = userPatchValidation.validate(req.body,{abortEarly:false});
    //Si la req du body ne correspond pas a ce qu'on attend
    if (validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await userRepository.update(req.params.id,req.body);
    res.json(req.body);
})


const userValidation = Joi.object({
    name:Joi.string().required(),
    firstName:Joi.string(),
    address:Joi.string(),
    email:Joi.string().email(),
    password:Joi.string().min(7)
});
const userPatchValidation = Joi.object({
    name:Joi.string(),
    firstName:Joi.string(),
    address:Joi.string(),
    email:Joi.string().email(),
    password:Joi.string().min(7)
});