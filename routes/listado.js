var express = require('express');
var router = express.Router();
var connection  = require('../lib/database.js');
const fs = require('fs');
const http = require('http');



router.get('/', function(req, res, next) {
     
  connection.query('SELECT * FROM prospectos ORDER BY id desc',function(err,rows)     {

    if(err){
      req.flash('error', err); 
      res.render('listado',{data:''});   
    }else{
      res.render('listado',{data:rows});
    }
                          
  });
       
});

router.post('/get_files', function(req, res) {
  let idprospecto = req.body.idprospecto;

  console.log(idprospecto)

  var dir = __dirname + '\\..\\uploads\\'+idprospecto+'\\';
  try {
    
    fs.readdir(dir, function (err, archivos) {
      if (err) {
        console.log(err);
        res.contentType('json');
        res.send({ files: '', ruta:  '' });
      }else{
        console.log(archivos);
        res.contentType('json');
        res.send({ files: JSON.stringify(archivos), ruta:  '\\..\\uploads\\'+idprospecto+'\\' });
      }
    });

  } catch (error) {
    res.contentType('json');
    res.send({ files: '', ruta:  '' });
  }
  
});

router.get('/descargar_archivo', function(req, res) {

  let archivo = req.query.file;
  let ruta = req.query.ruta;

  const file = __dirname + ruta + archivo;
  res.download(file); 

});


module.exports = router;