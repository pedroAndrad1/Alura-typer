var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//Função executada ao iniciar a página.
// Equivalente ao $("document").ready(function(){});
//Serve para chamar as outras funções quando a página for carregada.
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizarPlacar();

})
function atualizaTempo(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}
function atualizaTamanhoFrase(){
    var frase = $(".frase").text(); //Pega a frase
    var numPalavras = frase.split(" ").length; //conta a quantidade de palavras

    var tamanhoFrase = $(".tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    campo.on("input",function() {
          var conteudo = campo.val();
          // /\s+/ retorna tudo o que não for espaço na string
          // /\S+/ retorna tudo que for espaço na string
          // o g é pra buscar na String inteira
          //link fórum Alura com a explição:
          //https://cursos.alura.com.br/forum/topico-explicacao-dessa-expressao-replace-s-g-53527

          var quantCaracteres = conteudo.replace(/\s+/g, '').length;
          $("#contador-caracteres").text(quantCaracteres);

          var quantPalavras = conteudo.split(/\S+/).length - 1;
          $("#contador-palavras").text(quantPalavras);
    });
}

function inicializaCronometro(){
    campo.one("focus", function(){
          var tempoRestante = $("#tempo-digitacao").text();
          $("#botao-reiniciar").attr("disabled", true);
          var setIntervalID = setInterval(function(){
                tempoRestante--;
                $("#tempo-digitacao").text(tempoRestante);

                if(tempoRestante == 0){
                    clearInterval(setIntervalID);
                    finalizaJogo();
                }
            }, 1000);
    });

}

function finalizaJogo() {
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}
function reiniciaJogo() {
    /*Coloquei esse if para impedir que o clique do botao-reiniciar execute
    alguma ação fora da situação em que o jogo estivesse finalizado, causando
    bugs. Porém, o botão ainda é clicável fora dessa situação. O ideal seria ele
    estar em um estado de disabled e apenas ser clicável numa situação de jogo
    finalizado. */
    if(campo.hasClass("campo-desativado")){
        campo.attr("disabled",false);
        $("#contador-caracteres").text("0");
        $("#contador-palavras").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        campo.val(""); //Como é um input, é usado o val() em vez do text() para auterar o conteúdo.
        inicializaCronometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
}

function inicializaMarcadores() {

      campo.on("input",function(){
          var frase = $(".frase").text();
          var digitado = campo.val();

          if(frase.startsWith(digitado)){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
          }else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
          }

      /*
         var comparavel = frase.substr(0,digitado.length);

          console.log(digitado);
          console.log(comparavel);
          if(digitado == comparavel){
              campo.addClass("borda-verde");
              campo.removeClass("borda-vermelha");
          }else{
              campo.addClass("borda-vermelha");
              campo.removeClass("borda-verde");
          }
      */

      });

}
