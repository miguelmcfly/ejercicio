var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var fs = require("fs");

const conn = require('../lib/database.js');



router.get('/', function(req, res, next) {
  res.render('captura');
});


router.post('/fileupload', function (req, res){

  var form =  new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){

    //bloque para insertar prospecto, si inserta el prospecto, guarda los documentos
    conn.query('SELECT COUNT(id) as total FROM prospectos WHERE rfc = ? ',[fields.p_rfc],function (error, res, campo) {  
      if(error){
        console.log('Error al hacer el select: '+error);
      }else{
        console.log('Registros encontrados: '+res[0].total);
        if(parseInt(res[0].total) == 0){
          conn.query("INSERT INTO prospectos (nombre,apellido1,apellido2,calle,numero,colonia,codigo_postal,telefono,rfc) values (?,?,?,?,?,?,?,?,?)", [fields.p_nombre,fields.p_apellido1,fields.p_apellido2,fields.p_calle,fields.p_numero,fields.p_colonia,fields.p_cp,fields.p_telefono,fields.p_rfc] ,function(error, res, campo){
            if(error){
              console.log('Error al hacer el insert: '+error);
            }else{
              console.log('Se registro con exito '+res.insertId);
              let id = res.insertId;

              
              var names_uploads = JSON.parse(fields.names_uploads);

              //bloque para guardar los archivos
              var dir = __dirname + '\\..\\uploads\\'+id+'\\';
              if (!fs.existsSync(dir)){
                  fs.mkdirSync(dir, {recursive: true});
              }

              let x = 0;
              for (var file in files) {
                if(files.hasOwnProperty(file)){
                  var extension = files[file].originalFilename.split('.');
                  var oldpath   = files[file].filepath;
                  var newpath   =  dir + names_uploads[x] +'.'+ extension[1];
                  console.log(newpath);
                  fs.rename(oldpath, newpath, function(err){
                    if(err){
                      console.log(err);
                    }
                  });
                }
                x++;
              }
              //fin de bloque para guardar los archivos


            }
          });
        }
      }
    });

    res.writeHead(302, {
      'Location': 'http://localhost:3000/listado'
    });
    res.end();
      
 
  });
});


router.post('/existe_rfc', function (req, res1){

  let rfc = req.body.rfc;

  conn.query('SELECT COUNT(id) as total FROM prospectos WHERE rfc = ? ',[rfc],function (error, res, campo) {  
    if(error){
      console.log('Error al hacer el select: '+error);
    }else{
      console.log('Registros encontrados: '+res[0].total);
      if(parseInt(res[0].total) == 0){
        res1.send({ existe:  0 });
      }else{
        res1.send({ existe:  1 });
      }
    }
  });
  
});


module.exports = router;
