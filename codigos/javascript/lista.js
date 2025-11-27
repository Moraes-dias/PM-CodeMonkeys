import { todosIds } from './Pokedex.js';

const listaPokemonsDiv = document.getElementById('listaPokemon');

export async function aparecerPokemons(identificadores) {
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

            listaPokemonsDiv.innerHTML = '<p class = "text-center">Carregando pokemons...</p>'

            try
            {
                const limite = 386;
                const limitURL = `https://pokeapi.co/api/v2/pokemon?limit=${limite}`;

                const response = await fetch(limitURL);

                if(!response.ok) throw new Error("Falha ao carregar a lista de pokemons");

                const data = await response.json();

                const ids = data.results.map(p => {
                    const parts = p.url.split('/');

                    return parts[parts.length - 2];
                });

                todosIds = ids;
                //verificacao de filtro inicial
                const deveFiltrar = localStorage.getItem('filtrarFavoritos');

                if(deveFiltrar === 'true')
                {
                    localStorage.removeItem('filtrarFavoritos');
                    aplicarFiltroFavs();
                }else
                    if(ids.length > 0)
                {
                    await aparecerPokemons(ids)
                }
                else{
                    listaPokemonsDiv.innerHTML = '<p class = "text-center text-danger"> Não foi possível obter as informações</p>'
                }
            } catch(error)
            {
                console.error("Erro no carregamento automatico", error);
                listaPokemonsDiv.innerHTML = '<p class="text-center text-danger">Erro ao carregar a lista completa de Pokémons. Verifique sua conexão.</p>';
            }

                if(listaPokemonsDiv)
                    {
                carregarTudoAuto();

                if(btnFiltroFav)
                {
                    btnFiltroFav.addEventListener('click', aplicarFiltroFavs);
                }
                if(btnMostraTudo) {
                    btnMostraTudo.addEventListener('click', ()=> {
                        if(todosIds.length > 0)
                        {
                            carregarTudoAuto();
                        }
                    })
                }

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
