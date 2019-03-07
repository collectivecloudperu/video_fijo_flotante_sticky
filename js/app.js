// Declaramos las variables respectivas que usaremos
var $window = $(window);
var $cont_vid = $('.contenedor_video');
var $video = $('.video');

// Con el método .outerHeight(); obtenemos la altura externa de la clase .video
var alturaVideo = $video.outerHeight();

// Dejamos oculto por default el bótón para cerrar el video flotante
var $btn_cerrar = $('.btn_cerrar').hide();

//Mediate esta función capturamos si el usuario inicia la reproducción del video
jQuery(function($) {
  
  $('video.vid').one('play', function () { 

    //console.log("hola");

    // Por defecto limpiamos la clase videoflotante2 que establece la posicion inicial del video flotante
    $('.video').removeClass('videoflotante2');

    // Al desplazarnos hacia abajo o hacia arriba después de iniciar la reproducción del video, se muestra el video flotante o sticky
    $window.on('scroll',  function() {

      // Con el método .scrollTop(); obtenemosla posición actual de la barra de desplazamiento de la ventana '$window'
      var scrollTopWin = $window.scrollTop();

      // Con el método .offset(); obtenemos  las coordenadas de desplazamiento de un elemento
      var videoBottom= alturaVideo + $cont_vid.offset().top;
      //var scroll = $(window).scrollTop();
      
      // Si la posición actual de la ventana es > que el desplazamiento actual (alturaVideo + $cont_vid.offset().top;) realizamos el lanzado 
      // del video flotante o sticky o si no que siga oculto 
      if (scrollTopWin > videoBottom) {
        $cont_vid.height(alturaVideo);
        $video.addClass('videoflotante');
        $btn_cerrar.show();         
      } else {
        $cont_vid.height('auto');
        $video.removeClass('videoflotante');
        $btn_cerrar.hide();
      }

    });

  });

});

// En esta función luego que cerramos la ventana flotante. procedemos a detener el video 
jQuery(function($) {

  $('.btn_cerrar').on('click', function() {
    $('.video').addClass('videoflotante2');    
    $('video').trigger('pause');
  });  

});

// Con esta función volvemos a lanzar el video flotante si es que le damos nuevamente en reproducir (resumir video) para 
// continuar la reproducción del video
jQuery(function($) {
    $('video.vid').on('playing', function () {      
      $('.video').removeClass('videoflotante2');           
    });
}); 

//Con esta función quitamos la ventana flotante cuando el video es detenido, quitamos las clases asignadas
jQuery(function($) {
    $('video.vid').on('stop', function () {      
      $('.video').removeClass('videoflotante');
      $('.video').removeClass('videoflotante2');      
    });
});  

