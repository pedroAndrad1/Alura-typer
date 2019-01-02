$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function () {
        $("#erro").toggle();

        setInterval(function () {
            $("#erro").fadeOut(1000);
        }, 5000);
    })
    .always(function() {
       $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
      var numeroAleatorio = Math.floor(Math.random() * data.length);

      $(".frase").text(data[numeroAleatorio].texto);
      atualizaTamanhoFrase();
      atualizaTempo(data[numeroAleatorio].tempo);
}

function buscaFrase(){
  $("#spinner").toggle();
  var fraseid = $("#frase-id").val();
  var dado = {id: fraseid};

  $.get("http://localhost:3000/frases",dado,trocaFrase)
  .fail(function () {
      $("#erro").toggle();

      setInterval(function () {
          $("#erro").fadeOut(1000);
      }, 5000);
  })
  .always(function () {
      $("#spinner").toggle();
  });


}

function trocaFrase(data) {
    $(".frase").text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempo(data.tempo);
}
