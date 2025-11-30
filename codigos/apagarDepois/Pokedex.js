//favoritos, construtores, mapeamento, buscar, gerarPoke, aparecerPokemons, carregarTudoAuto, aplicarFiltroFav
//exibicao, 



document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.getElementById('form-busca');
    const buscador = document.getElementById('busca')
    const resultado = document.getElementById('resultado')
    if(form){
            form.addEventListener('submit', buscar)
        } else {
            console.error("Elemento não encontrado")
        }
});
document.addEventListener('DOMContentLoaded', ()=>{
    const listaPokemonsDiv = document.getElementById('listaPokemon');

    

    if(btnRandom)
    {
        btnRandom.addEventListener('click', aleatorio);
    }
});

