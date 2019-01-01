$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases",trocaFraseAleatoria )
}

function trocaFraseAleatoria(data) {
      var numeroAleatorio = Math.floor(Math.random() * data.lenght);
      console.log(numeroAleatorio);
      console.log(data.lenght);
      $(".frase").text(data[0].texto);
}
