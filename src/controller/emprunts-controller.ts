import { Router } from "express";
import Joi from "joi";
import {empruntsRepository} from '../repository/emprunts-repository';
import { checkId } from "../middleware";

export const empruntsController = Router();

empruntsController.get('/api/emprunts', async (req,res) => {
    const annonces = await empruntsRepository.findAll();
    res.json(annonces);
});
empruntsController.get('/api/emprunts/:id',checkId, async (req,res) => {
    
    const emprunts = await empruntsRepository.findById(req.params.id);
    if(!emprunts) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(emprunts);
});
// Insert un User dans la bdd
empruntsController.post('/api/emprunts',async(req,res)=>{
    const validation = empruntsValidation.validate(req.body,{abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const emprunts = await empruntsRepository.insert(req.body);
    res.status(201).json(emprunts);
});

empruntsController.patch('/api/emprunts/:id', checkId, async (req,res)=> {
    const validation = empruntsPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await empruntsRepository.update(req.params.id, req.body);
    res.json(req.body);
});
empruntsController.patch('/api/empruntsChoix/:id', checkId, async (req,res)=> {
    if(!req.body.status) {
        res.status(400).json("No status");
        return;
    }
    await empruntsRepository.statusX(req.params.id, req.body.status);
    res.json(req.body);
});




const empruntsValidation = Joi.object({
    status: Joi.string().required(),
    dateDebut:Joi.string().isoDate().required(),
    dateFin:Joi.string().isoDate().required(),
    msgEmprunts:Joi.string(),
    emObjet: Joi.object({
        _id: Joi.string().required(),
        name:Joi.string().required(),
        owner:Joi.object({
            _id: Joi.string().required(),
            name:Joi.string().required(),
            address:Joi.string().required()
        })
    }).required(),
    borrower:Joi.object({
        _id:Joi.string().required(),
        name:Joi.string().required()
    })
});

const empruntsPatchValidation = Joi.object({
    status: Joi.string(),
    dateDebut:Joi.string().isoDate(),
    dateFin:Joi.string().isoDate(),
    msgEmprunts:Joi.string(),
    emObjet: Joi.object({
        _id: Joi.string(),
        name:Joi.string(),
        owner:Joi.object({
            _id: Joi.string(),
            name:Joi.string(),
            address:Joi.string()
        })
    }),
    borrower:Joi.object({
        _id:Joi.string(),
        name:Joi.string()
    })
});