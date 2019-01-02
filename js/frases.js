$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
}

function trocaFraseAleatoria(data) {
      var numeroAleatorio = Math.floor(Math.random() * data.length);
      console.log(numeroAleatorio);
      console.log(data.lengt);
      console.log(data);
      $(".frase").text(data[numeroAleatorio].texto);
      atualizaTamanhoFrase();
      atualizaTempo(data[numeroAleatorio].tempo);
}
