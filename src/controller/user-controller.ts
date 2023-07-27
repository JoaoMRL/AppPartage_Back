import { Router } from "express";
import Joi from "joi";
import bcrypt from 'bcrypt';
// import {sign} from 'jsonwebtoken';
import {userRepository} from '../repository/user-repository';
import { checkId } from "../middleware";
// import passport from "passport";

export const userController = Router();

// Insert un User dans la bdd
userController.post('/api/user',async(req,res)=>{

    const validation = userValidation.validate(req.body,{abortEarly:false});
    //Si la req du body ne correspond pas a ce qu'on attend
    if (validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    //Si un user est déja présent
    if(await userRepository.findByEmail(req.body.email)){
        res.status(400).json({error:'User AlreadyExist'});
        return;
    }

    req.body.role='ROLE_USER';
    req.body.password=await bcrypt.hash(req.body.password,10);
    const user = await userRepository.insert(req.body);
    res.status(201).json(user);
});

//Le User se login
// userController.post('/api/loginUser',async(req,res)=>{

//     const validation = userValidation.validate(req.body,{abortEarly:false});
//     //Si la req du body ne correspond pas a ce qu'on attend
//     if (validation.error) {
//         res.status(400).json(validation.error);
//         return;
//     }

//     const user = await userRepository.findByEmail(req.body.email);
//     if (!user) {
//         res.status(401).json({error:'No user with this email'});
//         return;
//     }
    
//     const passwordCheck=await bcrypt.compare(req.body.password, user.password);
//     if (!passwordCheck) {
//         res.status(401).json({error:'Password Error'});
//         return;
//     }
    
//     const token = sign(user, process.env.JWT_SECRET!);
//     res.json({token});
// });

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
    address:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(7).required()
});
const userPatchValidation = Joi.object({
    name:Joi.string(),
    firstName:Joi.string(),
    address:Joi.string(),
    email:Joi.string().email(),
    password:Joi.string().min(7)
});