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

})

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
    var tempoRestante = $("#tempo-digitacao").text();

    campo.one("focus", function(){

          $("#botao-reiniciar").attr("disabled", true);
          var setIntervalID = setInterval(function(){
                tempoRestante--;
                $("#tempo-digitacao").text(tempoRestante);

                if(tempoRestante == 0){
                    campo.attr("disabled", true);
                    $("#botao-reiniciar").attr("disabled", false);
                    clearInterval(setIntervalID);
                    campo.toggleClass("campo-desativado");
                }
            }, 1000);
    });

}

function reiniciaJogo() {
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

function inicializaMarcadores() {
      var frase = $(".frase").text();

      campo.on("input",function(){

          var digitado = campo.val();
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

      });

}
