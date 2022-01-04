
$('#btn_enviar_prospecto').off('click').on('click',function(){
  let guardar = true;


  let str_cp        = document.getElementById("inputCodigopostal").value;
  let str_telefono  = document.getElementById("inputTelefono").value;
  let str_rfc       = document.getElementById("inputRFC").value;

  archivos = $('.archivo');
  nombres_archivos = $('.names-upload');

  var exp_cp = /^\d{5}/;
  if(!exp_cp.test(str_cp)){
    guardar = false;
    $('#inputCodigopostal').addClass('is-invalid');
    $('#validationCodigopostal').html('Debe ser numérico de 5 dígitos');
  }

  var exp_tel = /^\d{10}/;
  if(!exp_tel.test(str_telefono)){
    guardar = false;
    $('#inputTelefono').addClass('is-invalid');
    $('#validationTelefono').html('Debe ser numérico de 10 dígitos');
  }

  var exp_rfc = /^([A-ZÑ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/;
  if(!exp_rfc.test(str_rfc)){
    guardar = false;
    $('#inputRFC').addClass('is-invalid');
    $('#validationRFC').html('Debe tener formato RFC a 13 dígitos como persona física');
  }

  $('.requerido').each(function(){
    if($(this).val()==''){
      guardar = false;
      $(this).addClass('is-invalid');
    }
  });

  archivos.each(function(){
    if($(this).val()==''){
      guardar = false;
      $('#validationDocumentos').css('display','block');
      $('#validationDocumentos').html('Faltan archivos por seleccionar. Los documentos son obligatorios');
      return false;
    }
  });

  var names_uploads = [];
  nombres_archivos.each(function () {
    if($(this).val()==''){
      guardar = false;
      $(this).addClass('is-invalid');
      $('#validationDocumentosname'+$(this).data('row')).html('Los nombres de los documentos son obligatorios');
      return false;
    }else{
      names_uploads.push($(this).val());
    }
  });

  $('.requerido').each(function () {
    if($(this).hasClass('is-invalid')){
      guardar = false;
    }
  });






  // si todo estuvo correcto entra a hacer el submit
  if(guardar){

    $('#names_uploads').val(JSON.stringify(names_uploads));

    $('#submit_prospecto').trigger('click');
  }

});

$('.requerido').off('keyup').on('keyup',function (e) { 
  $(this).removeClass('is-invalid');
});

$('.archivo').off('change').on('change',function (e) { 
  feedback_documentos();
});

$('#btn_add_file').off('click').on('click',function(){
  let num_row = parseInt($('#card_datos div.row-file').last().data('row')) + 1;

  let html = '<div class="row-file form-row" data-row="'+num_row+'" id="row_file'+num_row+'">'+
                '<div class="col-md-4">'+
                  '<input type="text" class="form-control requerido names-upload" placeholder="Nombre del documento" data-row="'+num_row+'">'+
                  '<div id="validationDocumentosname'+num_row+'" class="invalid-feedback">'+
                    'Campo obligatorio'+
                  '</div>'+
                '</div>'+
                '<div class="col-md-4">'+
                  '<input type="file" class="archivo" name="upload'+num_row+'" data-row="'+num_row+'">'+
                '</div>'+
                '<div class="col-md-4 text-right">'+
                  '<input type="button" class="btn btn-danger btn-round btn-sm eliminar_file" value="Eliminar" data-row="'+num_row+'">'+
                '</div>'+
              '</div>';
  
  $('#card_datos').append(html);


  $('.eliminar_file').off('click').on('click',function(){
    eliminar_file($(this));
  });
  $('.archivo').off('change').on('change',function (e) { 
    feedback_documentos();
  });
  $('.requerido').off('keyup').on('keyup',function (e) { 
    $(this).removeClass('is-invalid');
  });
});

function eliminar_file(input){
  let row = input.data('row');
  $('#row_file'+row).remove();
}

function feedback_documentos(){
  $('#validationDocumentos').css('display','none');
}


$('#inputRFC').off('blur').on('blur', function () {

  let rfc = $(this).val();

  $.ajax({
    url: "/captura/existe_rfc",
    type: "POST",
    data: "rfc="+rfc,
    success: function(data) {
      console.log(data);
      console.log('process sucess');

      let existe = data.existe;
      if(existe==1){
        $('#inputRFC').addClass('is-invalid');
        $('#validationRFC').html('Este RFC ya esta registrado');
      }else{
        $('#inputRFC').removeClass('is-invalid');
      }

    },
    error: function() {
      console.log('process error');
    },
  });
});




$('#btn_salir_prospecto').off('click').on('click',function(){
  let text;
  if (confirm("¿Desea salir? Perderá toda la información capturada...") == true) {
    document.location.href="http://localhost:3000/";
  }
  
});