export interface User{
    _id?:any;
    name:string;
    firstName:string;
    address:string;
    email:string;
    password:string;
    role:string;
}

export interface Annonces{
    _id?:any;
    name:string;
    type:string;
    msg:string;
    owner:{
        _id:any;
        name:string;
        address:string;
    };
    status:boolean;
}

export interface Emprunts{
    _id?:any;
    status:string;
    dateDebut:Date;
    dateFin:Date;
    msgEmprunts:string;
    emObjet:{
        _id:any;
        name:string;
        owner:{
            _id:any;
            name:string;
            address:string;
        }
    };
    borrower:{
        _id:any;
        name:string
    };
}