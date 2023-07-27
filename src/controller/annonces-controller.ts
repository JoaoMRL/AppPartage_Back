import { Router } from "express";
import Joi from "joi";
import {annoncesRepository} from '../repository/annonces-repository';
import { checkId } from "../middleware";

export const annoncesController = Router();

annoncesController.get('/api/annonces', async (req,res) => {
    const annonces = await annoncesRepository.findAll();
    res.json(annonces);
});
annoncesController.post('/api/annoncesSearch',async (req,res)=>{
    const annonces = await annoncesRepository.findByChose(req.body.search);
    res.json(annonces);
})
annoncesController.get('/api/annonces/:id',checkId, async (req,res) => {
    
    const annonces = await annoncesRepository.findById(req.params.id);
    if(!annonces) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(annonces);
});


// Insert un User dans la bdd
annoncesController.post('/api/annonces',async(req,res)=>{
    const validation = annoncesValidation.validate(req.body,{abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const annonces = await annoncesRepository.insert(req.body);
    res.status(201).json(annonces);
});

annoncesController.patch('/api/annonces/:id', checkId, async (req,res)=> {
    const validation = annoncesPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await annoncesRepository.update(req.params.id, req.body);
    res.json(req.body);
});
const annoncesValidation = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    msg:Joi.string(),
    owner: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required()
    }).required(),
    status:Joi.boolean()
});

const annoncesPatchValidation = Joi.object({
    name: Joi.string(),
    type: Joi.string(),
    msg:Joi.string(),
    owner: Joi.object({
        _id: Joi.string(),
        name: Joi.string()
    }),
    status:Joi.boolean()
});