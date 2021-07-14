'use strict'

var User = require('../models/user.model');
var Book = require('../models/books.model');
var Lend = require('../models/lend.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
const {decode} = require('jwt-simple');
const { update } = require('../models/user.model');


function createBook(req, res){
    let book = new Book();
    var params = req.body;

    if(params.author &&
        params.title &&
        params.edition &&
        params.copies &&
        params.available){

            Book.findOne({$or:[{"data.author": params.author}, {"data.title": params.title}]},(err, finded)=>{
                if(err){
                    res.status(500).send({message: 'Error General', err});
                }else if(finded){
                    res.send({message: 'Este libro ya existe'});
                         
                }else{
                    let arrc = params.clues;
                    let answc = arrc.split(',');
                    answc.forEach(function(obj){
                         book.data.clues.push(obj.replace(/[ ]+/g, ''));
                    });
                    console.log(book.data.clues);
    
                    let arrt = params.themes;
                    let answt = arrt.split(',');
                    answt.forEach(function(objt){
                         book.data.themes.push(objt.replace(/[ ]+/g, ''));
                    });
                    console.log(book.data.themes);
    
    
                    book.data.author = params.author;
                    book.data.title = params.title;
                    book.data.edition = params.edition;
                    book.data.description = params.description;
                    book.data.copies = params.copies;
                    book.data.available = params.available;
    
                    book.save((err, bookSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general', err})
                        }else if(bookSaved){
                            res.send({message: 'Libro creado', bookSaved});
                            return console.log(bookSaved);
                             
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

function deleteBook(req, res){
var bookId = req.params.id;


        Book.findByIdAndRemove(bookId, (err, bookDeleted)=>{
            if(err){
                res.status(500).send({message: 'ERROR GENERAL', err});
            }else if(bookDeleted){
                    res.send({delete: bookDeleted})
            }else{
                res.status(418).send({message: 'error 2'})
            }
        })



}

function updateBook(req, res){
var bookId = req.params.id;
var update = req.body;

    Book.findByIdAndUpdate(bookId, update, {new: true}, (err, bookUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general al actualizar usuario'});
        }else if(bookUpdated){
            res.send({book: bookUpdated});
        }else{
            res.status(404).send({message: 'No se ha podido actualizar el usuario'});
        }
    });

}

function listBooks(req, res){
Book.find({}, (err, books)=>{
    if(err){
        res.status(418).send({message: 'Error general en la busqueda', err});
    }else if (books){
        res.send({booksF: books});
    }else{
        res.status(418).send({message: 'Sin datos que mostrar'});
    }
});
}

function listBookMm(req, res){
var copies = {copies : -1};
Book.find({},(err, copiesf)=>{
    if(err){
        res.status(500).send({message: 'Error general', err});
    }else if(copiesf){
        res.send({copiesf: copiesf});
    }else{
        res.status(418).send({message: 'No hay registros', err})
    }   

}).sort(copies);
}

function listBookMma(req, res){
var av = {available : -1};
Book.find({},(err, avf)=>{
    if(err){
        res.status(500).send({message: 'Error general', err});
    }else if(avf){
        res.send({avf: avf});
    }else{
        res.status(418).send({message: 'No hay registros', err})
    }   

}).sort(av);
}

function showBook(req, res){
var bookId = req.params.id;

Book.findById(bookId, (err, book)=>{
    if(err){
        res.status(418).send({message: 'Error general en la busqueda'});
    }else if (book){
        res.send({book: book});
    }else{
        res.status(418).send({message: 'Sin datos que mostrar'});
    }
});
}

function searchBook(req, res){
var params = req.body;
if(params.search != ''){
    Book.find({$or: [{clues : {$regex : params.search, $options: 'i'}}]}, (err, findW)=>{
                            if(err){
                                res.status(500).send({message: 'Error general 1', err});
                            }else if(findW){
                              if(findW.length == 0){
                                res.send({message: 'No hay coincidencias'});
                              }else{
                                    res.send({message:'Libro:',findW});
                              }
                               
                            }else{
                                res.status(418).send({message: 'Sin datos'});
                            }

                        })
}else if(params.search == ''){
    Book.find((err, books)=>{
        if(err){
            res.status(500).send({message: 'Error general', err});
        }else if(books){
            res.send({message:'Libros:',books});
        }else{
            res.status(418).send({message: 'Sin datos'});
        }
    })


}else{
    res.status(418).send({message: 'Ingrese datos'});
}

}

function lendBook(req, res){
    var lend = new Lend();
    var user = req.user;
    var userId = req.params.idU;
    var bookId = req.params.id;


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
                            if(find.data.books.length == 0){
                                Book.findById(bookId,(err, f)=>{
                                    if(err){
                                        res.status(500).send({message: 'Errorgeneral', err})
                                    }else if(f){
                                        lend.biblio_id = f._id;
                                        lend.title = f.data.title;
                                        lend.author = f.data.author;
                
                                            User.findByIdAndUpdate(userId, {$push:{"data.books": lend}}, {new: true}, (err,userU)=>{
                                                if(err){
                                                    res.status(500).send({message: 'Error general 2', err});
                                                }else if(userU){
                                                    Book.findByIdAndUpdate(bookId, {$push:{"data.user": user}}, {new:true}, (err, upd)=>{
                                                        if(err){
                                                            res.status(500).send({message: 'Error general 3', err})
                                                        }else if(upd){
                                              
                                                            Book.findByIdAndUpdate(bookId, {"data.available": upd.available - 1}, {new:true}, (err, yes)=>{
                                                                if(err){
                                                                    res.status(500).send({message: 'Error General 4', err})
                                                                }else if(yes){
                                                                    res.send({message: 'Has prestado el libro correctamente'});
                                                                     
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
                                User.findOne({$or:[{"data.books.biblio_id": bookId}]}, (err, fi)=>{
                                    if(err){
                                        res.status(500).send({message:'Error General 6', err});
                                    }else if(fi){
                                        res.send({message:'Este libro ya fue prestado'})
                                    }else{
                                        Book.findById(bookId,(err, f)=>{
                                            if(err){
                                                res.status(500).send({message: 'Errorgeneral', err})
                                            }else if(f){
                                                lend.biblio_id = f._id;
                                                lend.title = f.data.title;
                                                lend.author = f.data.author;
                         
                                                    User.findByIdAndUpdate(userId, {$push:{"data.books": lend}}, {new: true}, (err,userU)=>{
                                                        if(err){
                                                            res.status(500).send({message: 'Error general 2', err});
                                                        }else if(userU){
                                                            Book.findByIdAndUpdate(bookId, {$push:{"data.user": user}}, {new:true}, (err, upd)=>{
                                                                if(err){
                                                                    res.status(500).send({message: 'Error general 3', err})
                                                                }else if(upd){
                                                      
                                                                    Book.findByIdAndUpdate(bookId, {"data.available": upd.available - 1}, {new:true}, (err, yes)=>{
                                                                        if(err){
                                                                            res.status(500).send({message: 'Error General 4', err})
                                                                        }else if(yes){
                                                                            res.send({message: 'Has prestado el libro correctamente'});
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

function returnBook(req, res){
    var user = req.user;
    var userId = req.params.idU;
    var bookId = req.params.id;


        if(userId != user.sub){
            res.status(403).send({message: 'Error de permisos para esta ruta'});
         }else{
                
            User.findById(userId,(err, find)=>{
                if(err){
                    res.status(500).send({message: 'Errorgeneral5', err})

                }else if (find){
                    if(find.data.books.length == 0){
                       res.send({message: 'No tienes libros que devolver'});
                    }else{
                        User.findOne({$or:[{"data.books.biblio_id": bookId}]}, (err, fi)=>{
                            if(err){
                                res.status(500).send({message:'Error General 6', err});
                            }else if(fi){
                                Book.findById(bookId,(err, f)=>{
                                    if(err){
                                        res.status(500).send({message: 'Errorgeneral', err})
                                    }else if(f){
                 
                                            User.findByIdAndUpdate(userId, {$pull:{"data.books":{biblio_id: bookId}}}, {new: true}, (err,userU)=>{
                                                if(err){
                                                    res.status(500).send({message: 'Error general 2', err});
                                                }else if(userU){
                                                    Book.findByIdAndUpdate(bookId, {$pull:{"data.user":{sub: userId}}}, {new:true}, (err, upd)=>{
                                                        if(err){
                                                            res.status(500).send({message: 'Error general 3', err})
                                                        }else if(upd){
                                              
                                                            Book.findByIdAndUpdate(bookId, {"data.available": upd.available + 1}, {new:true}, (err, yes)=>{
                                                                if(err){
                                                                    res.status(500).send({message: 'Error General 4', err})
                                                                }else if(yes){
                                                                    res.send({message: 'Has devuelto el libro correctamente'});
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
                                res.send({message:'Este libro ya fue devuelto'})
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
    createBook,
    updateBook,
    deleteBook,
    listBooks,
    listBookMm,
    listBookMma,
    lendBook,
    returnBook,
    showBook,
    searchBook
}