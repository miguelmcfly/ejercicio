var express = require('express');
var router = express.Router();
var connection  = require('../lib/database.js');
const fs = require('fs');
const http = require('http');


router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM prospectos ORDER BY id desc',function(err,rows)     {

    if(err){
      req.flash('error', err); 
      res.render('evaluacion',{data:''});   
    }else{
      res.render('evaluacion',{data:rows});
    }
                          
  });
});

router.post('/get_files', function(req, res) {
  let idprospecto = req.body.idprospecto;

  console.log(idprospecto)

  var dir = __dirname + '\\..\\uploads\\'+idprospecto+'\\';
  fs.readdir(dir, function (err, archivos) {
    if (err) {
      onError(err);
      return;
    }else{
      console.log(archivos);
      res.contentType('json');
      res.send({ files: JSON.stringify(archivos), ruta:  '\\..\\uploads\\'+idprospecto+'\\' });
    }
  });
});

router.get('/descargar_archivo', function(req, res) {

  let archivo = req.query.file;
  let ruta    = req.query.ruta;

  const file = __dirname + ruta + archivo;
  res.download(file); 

});


router.post('/accept_prospecto', function(req, res) {
  let idprospecto = req.body.idprospecto;

  connection.query("UPDATE prospectos SET estado='A' WHERE id = ? ",[idprospecto],function(err,rows)     {
    if(err){
      req.flash('error', err); 
      console.log(err);
    }
    res.end();
                          
  });
});

router.post('/refuse_prospecto', function(req, res) {
  let idprospecto = req.body.idprospecto;
  let motivo = req.body.motivo;

  connection.query("UPDATE prospectos SET estado='R', motivo = ? WHERE id = ? ",[motivo,idprospecto],function(err,rows)     {
    if(err){
      req.flash('error', err); 
      console.log(err);
    }
    res.end();
                          
  });
});

module.exports = router;
