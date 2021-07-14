'use strict'

var User = require('../models/user.model');
var Book = require('../models/books.model');
var Magazine = require('../models/magazine.model');
var Lend = require('../models/lend.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
const {decode} = require('jwt-simple');
const { update } = require('../models/user.model');


function createMagazine(req, res){
    let magazine = new Magazine();
    var params = req.body;

    if(params.author &&
        params.title &&
        params.edition &&
        params.copies &&
        params.available){

            Magazine.findOne({$or:[{"data.author": params.author}, {"data.title": params.title}]},(err, finded)=>{
                if(err){
                    res.status(500).send({message: 'Error General', err});
                }else if(finded){
                    res.send({message: 'Esta revista ya existe'});
                         
                }else{
                    let arrc = params.clues;
                    let answc = arrc.split(',');
                    answc.forEach(function(obj){
                         magazine.data.clues.push(obj.replace(/[ ]+/g, ''));
                    });
                    console.log(magazine.data.clues);
    
                    let arrt = params.themes;
                    let answt = arrt.split(',');
                    answt.forEach(function(objt){
                         magazine.data.themes.push(objt.replace(/[ ]+/g, ''));
                    });
                    console.log(magazine.data.themes);
    
    
                    magazine.data.author = params.author;
                    magazine.data.title = params.title;
                    magazine.data.edition = params.edition;
                    magazine.data.description = params.description;
                    magazine.data.frequency = params.frequency;
                    magazine.data.nex = params.nex;
                    magazine.data.copies = params.copies;
                     magazine.data.available = params.available;
    
                    magazine.save((err, magazineSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general', err})
                        }else if(magazineSaved){
                            res.send({message: 'Revista creada', magazineSaved});
                            return console.log(magazineSaved);
                             
                        }else{
                            res.status(418).send({message: 'Error'})
                        }
                    })
    
                }
            })
            
            

        }else{
            res.status(418).send({message: 'Ingrese los datos necesarios'});

        }

}

function deleteMagazine(req, res){
var magazineId = req.params.id;


        Magazine.findByIdAndRemove(magazineId, (err, magazineDeleted)=>{
            if(err){
                res.status(500).send({message: 'ERROR GENERAL', err});
            }else if(magazineDeleted){
                    res.send({message: 'revista eliminada', magazineDeleted})
            }else{
                res.status(418).send({message: 'error 2'})
            }
        })



}

function updateMagazine(req, res){
var magazineId = req.params.id;
var update = req.body;

    Magazine.findByIdAndUpdate(magazineId, update , {new: true}, (err, magazineUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general al actualizar revista'});
        }else if(magazineUpdated){
            res.send({magazineUp: magazineUpdated});
        }else{
            res.status(404).send({message: 'No se ha podido actualizar el revista'});
        }
    });

}

function listMagazines(req, res){
Magazine.find({}, (err, magazines)=>{
    if(err){
        res.status(418).send({message: 'Error general en la busqueda'});
    }else if (magazines){
        res.send({magazinesF: magazines});
    }else{
        res.status(418).send({message: 'Sin datos que mostrar'});
    }
});
}

function showMagazine(req, res){
var magazineId = req.params.id;

Magazine.findById(magazineId, (err, magazine)=>{
    if(err){
        res.status(418).send({message: 'Error general en la busqueda'});
    }else if (magazine){
        res.send({magazineF: magazine});
    }else{
        res.status(418).send({message: 'Sin datos que mostrar'});
    }
});
}

function searchMagazine(req, res){
    var params = req.body;
    if(params.search != ''){
        Magazine.find({$or: [{clues : {$regex : params.search, $options: 'i'}}]}, (err, findW)=>{
                                if(err){
                                    res.status(500).send({message: 'Error general 1', err});
                                }else if(findW){
                                  if(findW.length == 0){
                                    res.send({message: 'No hay coincidencias'});
                                  }else{
                                        res.send({message:'Revista:',findW});
                                  }
                                   
                                }else{
                                    res.status(418).send({message: 'Sin datos'});
                                }

                            })
    }else if(params.search == ''){
        Magazine.find((err, magazines)=>{
            if(err){
                res.status(500).send({message: 'Error general', err});
            }else if(magazines){
                res.send({message:'Revistas:',magazines});
            }else{
                res.status(418).send({message: 'Sin datos'});
            }
        })

    
    }else{
        res.status(418).send({message: 'Ingrese datos'});
    }

}

function listMagazineMm(req, res){
    var copies = {copies : -1};
    Magazine.find({},(err, copiesf)=>{
        if(err){
            res.status(500).send({message: 'Error general', err});
        }else if(copiesf){
            res.send({copiesf: copiesf});
        }else{
            res.status(418).send({message: 'No hay registros', err})
        }   

    }).sort(copies);
}

function listMagazineMma(req, res){
    var avm = {available : -1};
    Magazine.find({},(err, avf)=>{
        if(err){
            res.status(500).send({message: 'Error general', err});
        }else if(avf){
            res.send({avf: avf});
        }else{
            res.status(418).send({message: 'No hay registros', err})
        }   

    }).sort(avm);
}

function lendMagazine(req, res){
    var lend = new Lend();
    var user = req.user;
    var userId = req.params.idU;
    var magazineId = req.params.id;


        if(userId != user.sub){
            res.status(403).send({message: 'Error de permisos para esta ruta'});
         }else{
                lend.user_id = user.sub;
                lend.name = user.name;
                lend.username = user.username;

            User.findById(userId,(err, find)=>{
                if(err){
                    res.status(500).send({message: 'Errorgeneral5', err})

                }else if (find){

                        var bo = find.data.books.length;
                        var ma = find.data.magazine.length;

                        var res= (ma + bo);

                        if(res >= 10){
                            res.send({message: 'No puede agregar más libros'})
                        }else{
                            if(find.data.magazine.length == 0){
                                Magazine.findById(magazineId,(err, f)=>{
                                    if(err){
                                        res.status(500).send({message: 'Errorgeneral', err})
                                    }else if(f){
                                        lend.biblio_id = f._id;
                                        lend.title = f.data.title;
                                        lend.author = f.data.author;
                
                                            User.findByIdAndUpdate(userId, {$push:{"data.magazine": lend}}, {new: true}, (err,userU)=>{
                                                if(err){
                                                    res.status(500).send({message: 'Error general 2', err});
                                                }else if(userU){
                                                    Magazine.findByIdAndUpdate(magazineId, {$push:{"data.user": user}}, {new:true}, (err, upd)=>{
                                                        if(err){
                                                            res.status(500).send({message: 'Error general 3', err})
                                                        }else if(upd){
                                              
                                                            Magazine.findByIdAndUpdate(magazineId, {"data.available": upd.available - 1}, {new:true}, (err, yes)=>{
                                                                if(err){
                                                                    res.status(500).send({message: 'Error General 4', err})
                                                                }else if(yes){
                                                                    res.send({message: 'Has prestado una revista correctamente'});
                                                                     
                                                                }else{
                                                                    res.status(418).send({message: 'Error 4'})
                                                                }
                                                            })
                                                        }else{
                                                            res.status(418).send({message: 'Error 3'})
                                                        }
                                                    });
                                                }else{
                                                    res.status(418).send({message:'Error 2'})
                                                }
                                            })
                                    }else{
                                        res.status(418).send({message: 'Error'})
                                    }
                                })
                            }else{
                                User.findOne({$or:[{"data.magazine.biblio_id": magazineId}]}, (err, fi)=>{
                                    if(err){
                                        res.status(500).send({message:'Error General 6', err});
                                    }else if(fi){
                                        res.send({message:'Esta revista ya fue prestada'})
                                    }else{
                                        Magazine.findById(magazineId,(err, f)=>{
                                            if(err){
                                                res.status(500).send({message: 'Errorgeneral', err})
                                            }else if(f){
                                                lend.biblio_id = f._id;
                                                lend.title = f.data.title;
                                                lend.author = f.data.author;
                         
                                                    User.findByIdAndUpdate(userId, {$push:{"data.magazine": lend}}, {new: true}, (err,userU)=>{
                                                        if(err){
                                                            res.status(500).send({message: 'Error general 2', err});
                                                        }else if(userU){
                                                            Magazine.findByIdAndUpdate(magazineId, {$push:{"data.user": user}}, {new:true}, (err, upd)=>{
                                                                if(err){
                                                                    res.status(500).send({message: 'Error general 3', err})
                                                                }else if(upd){
                                                      
                                                                    Magazine.findByIdAndUpdate(magazineId, {"data.available": upd.available - 1}, {new:true}, (err, yes)=>{
                                                                        if(err){
                                                                            res.status(500).send({message: 'Error General 4', err})
                                                                        }else if(yes){
                                                                            res.send({message: 'Has prestado la revista correctamente'});
                                                                        }else{
                                                                            res.status(418).send({message: 'Error 4'})
                                                                        }
                                                                    })
                                                                }else{
                                                                    res.status(418).send({message: 'Error 3'})
                                                                }
                                                            });
                                                        }else{
                                                            res.status(418).send({message:'Error 2'})
                                                        }
                                                    })
                                            }else{
                                                res.status(418).send({message: 'Error'})
                                            }
                                        })
                                    }
                                })
                            }
                        }

                    
                }else{
                    res.status(418).send({message: 'Error', err})

                }
            })
                
             }
    
}

function returnMagazine(req, res){
    var user = req.user;
    var userId = req.params.idU;
    var magazineId = req.params.id;


        if(userId != user.sub){
            res.status(403).send({message: 'Error de permisos para esta ruta'});
         }else{
                
            User.findById(userId,(err, find)=>{
                if(err){
                    res.status(500).send({message: 'Errorgeneral5', err})

                }else if (find){
                    if(find.data.magazine.length == 0){
                       res.send({message: 'No tienes revistas que devolver'});
                    }else{
                        User.findOne({$or:[{"data.magazine.biblio_id": magazineId}]}, (err, fi)=>{
                            if(err){
                                res.status(500).send({message:'Error General 6', err});
                            }else if(fi){
                                Magazine.findById(magazineId,(err, f)=>{
                                    if(err){
                                        res.status(500).send({message: 'Errorgeneral', err})
                                    }else if(f){
                 
                                            User.findByIdAndUpdate(userId, {$pull:{"data.magazine":{biblio_id: magazineId}}}, {new: true}, (err,userU)=>{
                                                if(err){
                                                    res.status(500).send({message: 'Error general 2', err});
                                                }else if(userU){
                                                    Magazine.findByIdAndUpdate(magazineId, {$pull:{"data.user":{sub: userId}}}, {new:true}, (err, upd)=>{
                                                        if(err){
                                                            res.status(500).send({message: 'Error general 3', err})
                                                        }else if(upd){
                                              
                                                            Magazine.findByIdAndUpdate(magazineId, {"data.available": upd.available + 1}, {new:true}, (err, yes)=>{
                                                                if(err){
                                                                    res.status(500).send({message: 'Error General 4', err})
                                                                }else if(yes){
                                                                    res.send({message: 'Has devuelto la revista correctamente'});
                                                                }else{
                                                                    res.status(418).send({message: 'Error 4'})
                                                                }
                                                            })
                                                        }else{
                                                            res.status(418).send({message: 'Error 3'})
                                                        }
                                                    });
                                                }else{
                                                    res.status(418).send({message:'Error 2'})
                                                }
                                            })
                                    }else{
                                        res.status(418).send({message: 'Error'})
                                    }
                                })
                                
                            }else{
                                res.send({message:'Esta revista ya fue devuelta'})
                            }
                        })
                    }
                }else{
                    res.status(418).send({message: 'Error', err})

                }
            })
                
             }

}

module.exports = {
    createMagazine,
    deleteMagazine,
    updateMagazine,
    listMagazines,
    showMagazine,
    searchMagazine,
    listMagazineMm,
    listMagazineMma,
    lendMagazine,
    returnMagazine
}