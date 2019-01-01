
$(function () {
  $("#botao-placar").stop().click(mostrarPlacar);
})


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Pedro";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);

    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);

    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    console.log(posicaoPlacar);
    /*No exerc´cio, manda selecionar o body para realizar a animação, mas não
    estava funicionando. Li no fórum que o funcionou para alguns selecionando
    o html e  funcionaou para mim também
    link: https://cursos.alura.com.br/forum/topico-scroll-sem-funcionar-74820*/ 
    $("html").animate(
    {
    scrollTop: posicaoPlacar//+px, deixei isto comentado pois funciona sem o +px,
                            //talvez use px como default.
    },500)
}

function novaLinha(usuario, palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);


    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().fadeOut(1000);

    setInterval(function(){
        $(this).parent().parent().remove();
    },1000);
}

function mostrarPlacar() {
    $(".placar").slideToggle(600);
    scrollPlacar();
}
