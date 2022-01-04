
$('.btn-infoprospecto').off('click').on('click',function(){

  let idprospecto = $(this).data('idprospecto');
  let nombre = $(this).data('nombre');
  let apellido1 = $(this).data('apellido1');
  let apellido2 = $(this).data('apellido2');
  let calle = $(this).data('calle');
  let numero = $(this).data('numero');
  let colonia = $(this).data('colonia');
  let cp = $(this).data('cp');
  let telefono = $(this).data('telefono');
  let rfc = $(this).data('rfc');
  let estado = $(this).data('estado');
  let status = $(this).data('status');
  let motivo = $(this).data('motivo');

  $.ajax({
    url: "/listado/get_files",
    type: "POST",
    data: "idprospecto="+idprospecto,
    success: function(data) {
      console.log(data);
      console.log('process sucess');

      let files = JSON.parse(data.files);
      let ruta = data.ruta;

      $('#ModalInfoProspecto_nombre').html(nombre);
      $('#ModalInfoProspecto_apellido1').html(apellido1);
      $('#ModalInfoProspecto_apellido2').html(apellido2);
      $('#ModalInfoProspecto_calle').html(calle);
      $('#ModalInfoProspecto_numero').html(numero);
      $('#ModalInfoProspecto_colonia').html(colonia);
      $('#ModalInfoProspecto_cp').html(cp);
      $('#ModalInfoProspecto_telefono').html(telefono);
      $('#ModalInfoProspecto_rfc').html(rfc);
      $('#ModalInfoProspecto_estado').html(estado);

      if(status == 'R'){
        $('#ModalInfoProspecto_row_motivo').removeClass('d-none');
        $('#ModalInfoProspecto_motivo').html(motivo);
      }else{
        $('#ModalInfoProspecto_row_motivo').addClass('d-none');
      }

      console.log(files);
      for(let i=0; i<=files.length-1; i++){
        console.log(files[i]);
        $('#div_files').append('<p><a class="link_file" href="#" data-file="'+files[i]+'" data-ruta="'+ruta+'">'+files[i]+'</a></p>');
      }
      if(files.length==0){
        $('#div_files').append('<p>No tiene documentos</p>');
      }

      $('.link_file').off('click').on('click',function (e) {
        e.stopPropagation();
        descarga_file($(this));
      });

      $('#ModalInfoProspecto').modal('show');
    },
    error: function() {
      console.log('process error');
    },
  });


});

function descarga_file(input){
  let ruta = input.data('ruta');
  let file = input.data('file');

  var form = $('#file_download');
  form.find('[name="file"]').val(file);
  form.find('[name="ruta"]').val(ruta);
  form.submit();

}

$('#ModalInfoProspecto').on('hidden.bs.modal', function (event) {
  $('#ModalInfoProspecto_nombre').html('');
  $('#ModalInfoProspecto_apellido1').html('');
  $('#ModalInfoProspecto_apellido2').html('');
  $('#ModalInfoProspecto_calle').html('');
  $('#ModalInfoProspecto_numero').html('');
  $('#ModalInfoProspecto_colonia').html('');
  $('#ModalInfoProspecto_cp').html('');
  $('#ModalInfoProspecto_telefono').html('');
  $('#ModalInfoProspecto_rfc').html('');
  $('#ModalInfoProspecto_estado').html('');
  $('#ModalInfoProspecto_motivo').html('');
  $('#div_files').html('');
})