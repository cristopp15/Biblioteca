'use strict'

var User = require('../models/user.model');
var Book = require('../models/books.model');
var Magazine = require('../models/magazine.model');
var Lend = require('../models/lend.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
const {decode} = require('jwt-simple');
const { update } = require('../models/user.model');

function register(req, res){
    var user = new User();
    var params = req.body;

    if( params.cui &&
        params.name &&
        params.username &&
        params.email &&
        params.password){
            User.findOne({$or:[{"data.cui": params.cui},{"data.username": params.username}, {"data.email": params.email}]}, (err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general, intentelo mas tarde'})
                }else if(userFind){
                    res.send({message: 'usuario, correo o Cui/Carnet ya utilizado'});
                }else{
                    user.data.cui = params.cui;
                    user.data.name = params.name;
                    user.data.lastname = params.lastname;
                    user.data.username = params.username;
                    user.data.email = params.email;
                    user.data.role = params.role;
 
                    bcrypt.hash(params.password, null, null, (err, passwordHash)=>{
                        if(err){
                            res.status(500).send({message: 'Error al encriptar contraseña'});
                        }else if(passwordHash){
                            user.data.password = passwordHash;

                            user.save((err, userSaved)=>{
                                if(err){
                                    res.status(500).send({message: 'Error general al guardar usuario'});
                                }else if(userSaved){

                                    res.send({message: 'Usuario Registrado', user: userSaved});
                                }else{
                                    res.status(404).send({message: 'Usuario no guardado'});
                                }
                            });
                        }else{
                            res.status(418).send({message: 'Error inesperado'});
                        }
                    });
                }
            });
    }else{
         return console.log(params)
        res.send({message: 'Ingresa todos los datos'});
    }
}

function registerAdmin(req, res){
    var user = new User();
    var params;

            User.findOne({$or:[{"data.cui": 'admin'},{"data.username": 'admin'}, {"data.email": 'admin'}]}, (err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general, intentelo mas tarde'})
                }else if(userFind){
                    console.log('Admin ya fue creado')
                }else{
                    user.data.cui = 'admin';
                    user.data.name = 'admin';
                    user.data.lastname = 'admin';
                    user.data.username = 'admin';
                    user.data.email = 'admin';
                    user.data.role = 'admin';
                    user.data.password = 'admin';
 
                    bcrypt.hash(user.data.password, null, null, (err, passwordHash)=>{
                        if(err){
                            res.status(500).send({message: 'Error al encriptar contraseña'});
                        }else if(passwordHash){
                            user.data.password = passwordHash;

                            user.save((err, userSaved)=>{
                   
                                if(err){
                                    res.status(500).send({message: 'Error general al guardar usuario'});
                                }else if(userSaved){
                                    console.log('admin creado correctamente', userSaved)
                                }else{
                                    res.status(404).send({message: 'Usuario no guardado'});
                                }
                            });
                        }else{
                            res.status(418).send({message: 'Error inesperado'});
                        }
                    });
                }
            });
   
}

registerAdmin();

function login(req, res){
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            User.findOne({$or:[{"data.username": params.username}, 
                {"data.email": params.email}]}, (err, check)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(check){
                        console.log(check.data.password);
                        bcrypt.compare(params.password, check.data.password, (err, passworOk)=>{
                            if(err){
                                res.status(500).send({message: 'Error al comparar', err});
                            }else if(passworOk){
                                if(params.gettoken = true){
                                    res.send({token: jwt.createToken(check), user: check});
                                }else{
                                    res.send({message: 'Hey'});
                                }

                            }else{
                                res.send({message: 'Contraseña incorrecta'});
                            }
                        });
                    }else{
                        res.send({message: 'Datos de usuario incorrectos'});
                    }
                });
        }else{
           res.send({message: 'Ingresa tu contraseña'}); 
        }
    }else{
        res.send({message: 'Ingresa tu correo o tu username'});
    }
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

        User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
            if(err){
                res.status(500).send({message: 'Error general al actualizar usuario'});
            }else if(userUpdated){
                res.send({user: userUpdated});
            }else{
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }
        });
    
}

function uploadImage(req, res){
    var userId = req.params.id;
    var fileName = 'No subido';

    if(userId != req.user.sub){
        res.status(403).send({message: 'Error de permisos para esta ruta'});
    }else{
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[2];
    
            var ext = fileName.split('\.');
            var fileExt = ext[1];

            if( fileExt == 'png' ||
                fileExt == 'jpg' ||
                fileExt == 'jpeg' ||
                fileExt == 'gif'){
                    User.findByIdAndUpdate(userId, 
                        {image: fileName}, 
                        {new: true},
                        (err, userUpdated)=>{
                            if(err){
                                res.status(500).send({message: ' Error general al actualizar'});
                            }else if(userUpdated){
                                res.send({user: userUpdated, image: userUpdated.image});
                            }else{
                                res.status(418).send({message: 'No se ha podido actualizar'});
                            }
                        });
            }else{
                fs.unlink(filePath, (err)=>{
                    if(err){
                        res.status(418).send({message: 'Extensión de archivo no admitida, y archivo no eliminado'});
                    }else{
                        res.send({message: 'Extensión de archivo no admitida'});
                    }
                });
            }
            }else{
            res.status(404).send({message: 'No has subido una imagen'});
        }
    }
}

function getImage(req,  res){
    var userId = req.params.id;
    var fileName = req.params.image;
    var pathFile = './uploads/users/'+fileName;

    fs.exists(pathFile, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message: 'Imagen inexistente'});
        }
    });
}

function listUsers(req, res){
    User.find({}, (err, users)=>{
        if(err){
            res.status(418).send({message: 'Error general en la busqueda'});
        }else if (users){
            res.send({users: users});
        }else{
            res.status(418).send({message: 'Sin datos que mostrar'});
        }
    });
}

function getUser(req, res){
   var userId = req.params.idU;

    User.findById(userId, (err, users)=>{
        if(err){
            res.status(418).send({message: 'Error general en la busqueda'});
        }else if (users){
            res.send({user: users});
        }else{
            res.status(418).send({message: 'Sin datos que mostrar'});
        }
    });
}

function deleteUser(req, res){
    var userId = req.params.id;

    
            User.findByIdAndRemove(userId, (err, userDeleted)=>{
                if(err){
                    res.status(500).send({message: 'ERROR GENERAL', err});
                }else if(userDeleted){
                        res.send({message: 'Usuario eliminado',user: userDeleted})
                }else{
                    res.status(418).send({message: 'error 2'})
                }
            })
    


}





module.exports = {
    register,
    registerAdmin,
    login,
    updateUser,
    deleteUser, 
    uploadImage,
    getImage,
    listUsers,
    getUser

}
