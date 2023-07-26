import 'dotenv/config';
import './auth-config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { userController } from './controller/user-controller';
import { annoncesController } from './controller/annonces-controller';
import { empruntsController } from './controller/emprunts-controller';


const port = process.env.PORT || 3000;

const app = express();
// Requentes en Json
app.use(express.json());
app.use(cors());

// Route Controller
app.use(userController);
app.use(annoncesController);
app.use(empruntsController);


app.get('/',(req,res)=>{
    res.json({message:"Welcom to Projet Partage ☺ ☺"})
})

// Info sur le port choisit
app.listen(port, () => {
    console.log('listening on http://localhost:'+port);
});