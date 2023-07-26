use('projetPartage');

db.user.find();
// db.annonces.find();
// db.emprunts.find();


// db.user.insertMany([
//     {
//         name:'Joao',
//         firstName:'Leite',
//         address:'3 rue des Pierres',
//         email:'jole@gmail.com',
//         password:'',
//         role:'ROLE_USER'
//     },
//     {
//         name:'Pedro',
//         firstName:'Cailloux',
//         address:'3 rue des Terminis',
//         email:'pierre@gmail.com',
//         password:'',
//         role:'ROLE_USER'
//     },
//     {
//         name:'Vic',
//         firstName:'Tor',
//         address:'3 rue du Paradis',
//         email:'victor@gmail.com',
//         password:'',
//         role:'ROLE_USER'
//     },
// ]);

// db.annonces.insertMany([
//     {
//         name:'Svastica',
//         type:'Religion',
//         msg:'Symbole Asiatique',
//         owner:{
//             "_id": {
//                 "$oid": "64c0e15643572e96c800d965"
//             },
//             "name": "Pedro"
//         },
//         status:false
//     },
//     {
//         name:'Zergling',
//         type:'Animaux',
//         msg:'Ils aiment pas le jus de citron',
//         owner:{
//             "_id": {
//                 "$oid": "64c0e15643572e96c800d966"
//             },
//             "name": "Vic"
//         },
//         status:false
//     },
// ]);


// db.emprunts.insertMany([
//     {
//         status:'en Attente',
//         dateDebut:'2023-07-25',
//         dateFin:'2023-07-28',
//         msgEmprunts:'oui je voudrais une pierre de compagnie',
//         emObjet:{
//             "_id": {
//                 "$oid": "64c0e2e1bea0a84c5e10dacd"
//               },
//             "name": "Pierre",
//             "owner": {
//                 "_id": {
//                   "$oid": "64c0e15643572e96c800d964"
//                 },
//                 "name": "Joao"
//               }

//         },
//         borrower:{
//             "_id": {
//                 "$oid": "64c0e15643572e96c800d965"
//             },
//             "name": "Pedro"
//         }
//     },
//     {
//         status:'en Attente',
//         dateDebut:'2023-07-25',
//         dateFin:'2023-07-28',
//         msgEmprunts:'oui je voudrais une',
//         emObjet:{
//             "_id": {
//                 "$oid": "64c0e3da97366ae918fb72dd"
//             },
//             "name": "Svastica",
//             "owner": {
//             "_id": {
//                 "$oid": "64c0e15643572e96c800d965"
//             },
//             "name": "Pedro"
//             }
//         },
//         borrower:{
//             "_id": {
//                 "$oid": "64c0e15643572e96c800d964"
//             },
//             "name": "Joao"
//         }
//     },
//     {
//         status:'en Attente',
//         dateDebut:'2023-07-29',
//         dateFin:'2023-07-30',
//         msgEmprunts:'oui je voudrais une pierre de compagnie',
//         emObjet:{
//             "_id": {
//                 "$oid": "64c0e2e1bea0a84c5e10dacd"
//               },
//             "name": "Pierre",
//             "owner": {
//                 "_id": {
//                   "$oid": "64c0e15643572e96c800d964"
//                 },
//                 "name": "Joao"
//               }

//         },
//         borrower:{
//             "_id": {
//                 "$oid": "64c0e15643572e96c800d966"
//             },
//             "name": "Vic"
//         }
//     },
    
// ])

