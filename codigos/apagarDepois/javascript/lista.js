import { criarPokemons } from './api.js';
import { gerarPoke } from './criar.js';
import { obterFavs } from "./fav.js";



var todosIds = [];

export async function aparecerPokemons(identificadores) {
        const listaPokemonsDiv = document.getElementById('listaPokemon');
        if(!listaPokemonsDiv) return;

        try{
            const mons = await criarPokemons(identificadores);

            if(mons && mons.length > 0)
            {
                const htmlMons = mons.map(gerarPoke).join('');
                //listaPokemonsDiv.innerHTML = '<div class = "row">${listaPokemonsDiv}</div>'
                listaPokemonsDiv.innerHTML = htmlMons;
            } else {
                listaPokemonsDiv.innerHTML = '<p class = "text-center text-danger">Erro ao carregar os dados. Tente novamente.</p>';
            }
        } catch (erro)//lista
        {
            console.error("Erro na exibicao de pokemon: ", erro);
            listaPokemonsDiv.innerHTML = '<p class = "text-center text-danger">Erro ao exibir lista de pokemons</p>';
        }
    }


    export async function carregarTudoAuto() {
        const listaPokemonsDiv = document.getElementById('listaPokemon');
        listaPokemonsDiv.innerHTML = '<p class="text-center">Carregando pokemons...</p>';

    try {
        const limite = 386;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        if(!response.ok) throw new Error("Falha ao carregar");

        const data = await response.json();
        const ids = data.results.map(p => p.url.split('/').slice(-2)[0]);

        todosIds = ids;

        const deveFiltrar = localStorage.getItem('filtrarFavoritos');

        if(deveFiltrar === 'true') {
            localStorage.removeItem('filtrarFavoritos');
            return aplicarFiltroFavs();
        }

        return aparecerPokemons(ids);

    } catch (error) {
        console.error("Erro no carregamento automatico", error);
        listaPokemonsDiv.innerHTML = '<p class="text-center text-danger">Erro ao carregar</p>';
    }
}

        //carregarTudoAuto();
        export function aplicarFiltroFavs()
        {
            const favoritos = obterFavs();

            const idsFavs = favoritos.map(id => parseInt(id, 10));

            const idFiltrar = todosIds.filter(id =>{
                return idsFavs.includes(parseInt(id, 10))
            });
            if(idFiltrar.length > 0)
            {
                aparecerPokemons(idFiltrar);
            } else {
                listaPokemonsDiv.innerHTML = '<p class = "text-center alert alert-info">Voce não possui pokemons favoritos!</p>'
            }
        }