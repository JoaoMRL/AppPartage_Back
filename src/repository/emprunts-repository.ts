
import { ObjectId } from "mongodb";
import { connection } from "./connection"
import { Emprunts } from "../entities";

const collection = connection.db('projetPartage').collection<Emprunts>('emprunts');


export const empruntsRepository={
    findAll(){
        return collection.find().toArray();
    },
    findById(_id:string){
        return collection.findOne(new ObjectId(_id));
    },
    async insert(annonces:Emprunts) {
        const result= await collection.insertOne(annonces);
        annonces._id = result.insertedId;
        return annonces;
    },
    update(_id:string, annonces:Emprunts) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:annonces});
    },
    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    statusX(_id:string,choix:string){
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:{status:choix}});
        
    }
}