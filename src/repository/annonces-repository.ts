
import { ObjectId } from "mongodb";
import { connection } from "./connection"
import { Annonces } from "../entities";

const collection = connection.db('projetPartage').collection<Annonces>('annonces');


export const annoncesRepository={
    findAll(){
        return collection.find().toArray();
    },
    findById(_id:string){
        return collection.findOne(new ObjectId(_id));
    },
    findByAddress(adres:string){
        return collection.find({address:adres}).toArray();
    },
    findByType(type:string){
        return collection.find({type:type}).toArray();
    },
    findByTerm(term:string){
        return collection.find({name:{$regex:term}}).toArray();
    },
    async insert(annonces:Annonces) {
        const result= await collection.insertOne(annonces);
        annonces._id = result.insertedId;
        return annonces;
    },
    update(_id:string, annonces:Annonces) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:annonces});
    },
    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
}