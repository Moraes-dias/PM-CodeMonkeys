function obterFavs()
{
    const favsJSON = localStorage.getItem('favoritos');
    return favsJSON ? JSON.parse(favsJSON) : []
}

function saveFav(favoritos)
{
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


class pokemon
{
    constructor(numDex = 0, nome = 'padrao', regiao = 'padrao', tipos = [], favorito = false)
    /*
        construtor do pokemon necessario fazer 2 classes uma para o
        o pokemon em si e uma para os status para assim evitar linhas desnecessarias
    */
    {
        this.numDex = numDex;
        this.nome = nome;
        this.regiao = regiao;
        this.tipos = tipos;
        this.favorito = favorito;
    }
    descricao() //metodo para mostrar as caracteristicas do pokemon
    {
        const favoritado = this.favorito ? 'sim' : 'nao';
        return `#${this.numDex} ${this.nome} ${this.regiao} Tipagem: ${this.tipos.join(", ")} favorito: ${favoritado}`
    }
}



class status extends pokemon
{
    constructor(numDex, nome, regiao, tipos, favorito,  hp = 0,atkFisico = 0, defFisica = 0, atkEspecial = 0, defEspecial = 0, velocidade = 0)
    {
        super(numDex, nome, regiao, tipos, favorito); //heranca das caracteristicas da classe pai (pokemon)

        this.hp = hp;
        this.atkFisico = atkFisico;
        this.defFisica = defFisica;
        this.atkEspecial = atkEspecial;
        this.defEspecial = defEspecial;
        this.velocidade = velocidade;
    }
    mostrarValores() //mostrar somente os status
    {
        return `HP: ${this.hp} ATK fisico: ${this.atkFisico} DEF fisica: ${this.defFisica} ATK especial: ${this.atkEspecial} DEF especial: ${this.defEspecial} VEL: ${this.velocidade}`
    }
}

class user{
    constructor(senha = 0, email='eita' , usuario='kkkkk'){
        this.senha = senha;
        this.email = email;
        this.usuario=usuario;
    }
    mostrarDadosUsuario()
    {
        return `usuario: ${this.usuario} email: ${this.email}`
    }

}

/**
* mapeamento de dados da api
*@param {Object} dados//esses tres ajudam a entender o que a funcao vai fazer
*@param {string} regiaoPadrao//no caso os parametros, tipo de dado(object é JSON) e o nome do parametro/variavel
*@returns {status}//aqui é a saída esperada, no caso um objeto status
*/
function mapeamentoStatus(dados, regiaoPadrao = 'desconhecida')
 {
    const numDex = dados.id;
    //aqui eu pego o nome e o id da api e falo que a primeira letra é maiuscula e junto com o resto do nome
    //No caso como uma string é um vetor, eu vou pegar a posição 0 e transformar ela em maiuscula e juntar com o resto do nome(usando slice(1))
    //ex: pikachu[0,1,2,3,4,5,6] 0 = p->P + 1..6 = ikachu->Pikachu
    const nome = dados.name.charAt(0).toUpperCase() + dados.name.slice(1);
    //mesma coisa que o anterior
    const tipos = dados.types.map(tipagem =>
        tipagem.type.name.charAt(0).toUpperCase() + tipagem.type.name.slice(1)
    );

    const mapeamentoStatus = dados.stats.reduce((acc, infoStatus)=>{
        acc[infoStatus.stat.name] = infoStatus.base_stat;
        return acc;
    }, {});
    const favoritos = obterFavs();
    const isFavorito = favoritos.includes(numDex)
    return new status(
        numDex,
        nome,
        regiaoPadrao,
        tipos,
        isFavorito,
        mapeamentoStatus['hp'],
        mapeamentoStatus['attack'],
        mapeamentoStatus['defense'],
        mapeamentoStatus['special-attack'],
        mapeamentoStatus['special-defense'],
        mapeamentoStatus['speed']
    );
}

/*
    async faz com que seja uma função assíncrona
    por ser uma funcao assincrona ela precisa de uma promise que é o resultado final da função
*/
/**
 * Busca varios
 * @param {Array<string | number>} identificadores
 * @returns {Promise<array<status>>} retorna a promise
 */

async function criarPokemons(identificadores, regiaoPadrao = 'desconhecida') {
    const linkUrl = "https://pokeapi.co/api/v2/pokemon/"

    const buscarPromise = identificadores.map(id =>
        fetch(`${linkUrl}${String(id).toLowerCase()}`)
    );

    try {
        //o await faz com que as promises sejam terminadas
        const respostas = await Promise.all(buscarPromise);

        const respostaPromise = respostas.map(resposta =>{
            if(!resposta.ok) {
                throw new Error(`Falha ao buscar ID/Nome: ${resposta.url.split('/').pop()}`);

            }
            return resposta.json();
        });

        const tudoCompleto = await Promise.all(respostaPromise);

        const listaPokemons = tudoCompleto.map(dados => mapeamentoStatus(dados, 'Kanto'));
        return listaPokemons;
    } catch (erro) {
        console.error("Um erro ocorreu durante a busca de dados em lote: ", erro.message)
    }
}


document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.getElementById('form-busca');
    const buscador = document.getElementById('busca')
    const resultado = document.getElementById('resultado')
        function buscar(evento) {
            evento.preventDefault();


            let termo = buscador.value.trim();

            if(termo === "")
            {
                resultado.innerHTML = "<p>Digite o nome de um pokemon da primeira geração</p>"
                return;
            }

            localStorage.setItem('termoBusca', termo.toLowerCase())

            window.location.href = 'pokeall.html'
        }

    if(form){
            form.addEventListener('submit', buscar)
        } else {
            console.error("Elemento não encontrado")
        }
});
document.addEventListener('DOMContentLoaded', ()=>{
    const listaPokemonsDiv = document.getElementById('listaPokemon');
    
    const btnFiltroFav = document.getElementById('favs');
    const btnMostraTudo = document.getElementById('mostrarDex')
    const btnRandom = document.getElementById('random');

    let todosIds = [];

    const termoBusca = localStorage.getItem('termoBusca');
    function gerarPoke(p) {
        const coracao = p.favorito ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart text-secondary'

                return `
                <div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-3">
                    <div class="card shadow-sm h-100" style="border: 2px solid #0d6efd;">
                        <div class="card-body">
                            <div class = "d-flex justify-content-beetween align-items-center">
                                <h5 class="card-title text-center text-primary">#${p.numDex} ${p.nome}</h5>
                                <button class = "btn btn-sm p-0 favorito-btn" data-dex-id="${p.numDex}" style = "border: none; background: none;">
                                    <i class = "${coracao} fs-4"></i>
                                </button>
                            </div>
                                <p class="card-text small mb-1"><strong>Região:</strong> ${p.regiao}</p>
                                <p class="card-text small mb-2"><strong>Tipagem:</strong> <span class="badge bg-secondary">${p.tipos.join("</span> <span class='badge bg-secondary'>")}</span></p>
                                <p class="card-text small mb-2"><strong>Favorito:</strong> ${p.favorito ? 'Sim' : 'Não'}</p>
                                <hr class="my-1">
                                <p class="card-text small text-muted text-truncate" title="${p.mostrarValores()}">
                                ${p.mostrarValores()}
                                </p>
                        </div>
                    </div>
                </div>`
            }
    async function aparecerPokemons(identificadores) {
        if(!listaPokemonsDiv) return;

        try{
            const mons = await criarPokemons(identificadores, 'kanto');

            if(mons && mons.length > 0)
            {
                const htmlMons = mons.map(gerarPoke).join('');
                //listaPokemonsDiv.innerHTML = '<div class = "row">${listaPokemonsDiv}</div>'
                listaPokemonsDiv.innerHTML = htmlMons;
            } else {
                listaPokemonsDiv.innerHTML = '<p class = "text-center text-danger">Erro ao carregar os dados. Tente novamente.</p>';
            }
        } catch (erro)
        {
            console.error("Erro na exibicao de pokemon: ", erro);
            listaPokemonsDiv.innerHTML = '<p class = "text-center text-danger">Erro ao exibir lista de pokemons</p>';
        }
    }

    
    function favoritar(numDex)
    {
        numDex = parseInt(numDex, 10);
        let favoritos = obterFavs();

        const index = favoritos.indexOf(numDex);
        if(index > -1)
        {
            favoritos.splice(index, 1);
            console.log(`Pokemon #${numDex} removido dos favoritos`)
        } else {
            favoritos.push(numDex);
            console.log(`Pokemon #${numDex} adicionado aos favoritos`)
        }
        saveFav(favoritos);
    }
    document.addEventListener('click', (fav) =>{
        const btnFavorito = fav.target.closest('.favorito-btn');

        if(btnFavorito)
        {
            const numDex = btnFavorito.dataset.dexId;

            favoritar(numDex)

            const icone = btnFavorito.querySelector('i');

            const estaFavorito = icone.classList.contains('fa-solid');

            icone.classList.toggle('fa-solid', !estaFavorito);
            icone.classList.toggle('fa-regular', estaFavorito);
            icone.classList.toggle('text-danger', !estaFavorito);
            icone.classList.toggle('text-secondary', estaFavorito);
        }
    })//botao favoritos

    if(listaPokemonsDiv)
    {
        async function carregarTudoAuto() {
            
            listaPokemonsDiv.innerHTML = '<p class = "text-center">Carregando pokemons...</p>'

            try
            {
                const limite = 1025;
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
        }

        carregarTudoAuto();
        function aplicarFiltroFavs()
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
    async function exibicao(identificadores)
    {
        const resultadoBuscaDiv = document.getElementById(`buscaPronta`)
        
        if(!resultadoBuscaDiv) return; //cancelamento funcao

        resultadoBuscaDiv.innerHTML = '<p class= "text-center">Buscando Pokemon...</p>'

        try{
            const listaPokemons = await criarPokemons(identificadores, 'Região desconhecida')

            if(listaPokemons && listaPokemons.length > 0)
            {
                const achou = listaPokemons[0];
                const coracaoBusca = achou.favorito ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart text-secondary'
                const conteudoAchou = `
                    <div class = "card shadow-lg h-100 border-success">
                        <div class = "card-body">
                            <div class = "d-flex justify-content-beetween align-items-center
                                <h4 class = "card-title text-center text-success">${achou.nome.toUpperCase()}</h4>
                                <button class = "btn btn-sm p-0 favorito-btn" data-dex-id = "${achou.numDex}" sytle = "border: none; background: none;">
                                    <i class = "${coracaoBusca} fs-4"></i>
                                </button>
                            </div>
                            <hr>
                            <p><strong>#${achou.numDex}</strong></p>
                            <p><strong>Região: </strong>${achou.regiao}</p>
                            <p><strong>Tipo:</strong>${achou.tipos.join(" / ")}</p>
                            <p><strong>Favorito:</strong>${achou.favorito ? 'sim' : 'não'}</p>
                            <h5>Status</h5>
                            <p>${achou.mostrarValores()}</p>
                        </div>
                    </div>
                `;
                resultadoBuscaDiv.innerHTML = conteudoAchou;
            } else {
                resultadoBuscaDiv.innerHTML = `<p class = "alert alert-danger">Pokemon"${identificadores[0]}" não encontrado </p>`
            }
        } catch (erro) {
            console.error("Erro na busca e exibição única: ", erro);
            resultadoBuscaDiv.innerHTML  = `<p class = "alert alert-danger">Erro inesperado ao buscar pokemon</p>`
        }
    }

    if(termoBusca)
    {
        localStorage.removeItem('termoBusca')
        exibicao([termoBusca]);
    } else {
        const resultadoBuscaDiv = document.getElementById('buscaPronta')

        if(resultadoBuscaDiv)
        {
            resultadoBuscaDiv.innerHTML = '';
            resultadoBuscaDiv.classList.add('escondido')
        }
    }

    function aleatorio()
    {
        const minimo = Math.ceil(1);
        const maximo = Math.floor(1025);

        const idRandom = Math.floor(Math.random() * (maximo - minimo +1)) + minimo;

        exibicao([idRandom]);
    }

    if(btnRandom)
    {
        btnRandom.addEventListener('click', aleatorio);
    }
});

function irFavs()
{
    console.log('funcionou')
    localStorage.setItem('filtrarFavoritos', 'true');

    window.location.href = 'pokeall.html'
}



/*

logo antes btnMostrarTudo
if(btnFiltroFav) 
        {
            btnFiltroFav.addEventListener('click', () => {
                const favoritos = obterFavs();

                const idsFavs = favoritos.map(id => parseInt(id, 10));

                const idFiltrar = todosIds.filter(id => {
                    return idsFavs.includes(parseInt(id, 10));
                });
                if(idFiltrar.length > 0)
                {
                    aparecerPokemons(idFiltrar);
                } else {
                    listaPokemonsDiv.innerHTML = '<p class = "text-center alert alert-info">Você não possui Pokemon favoritos!</p>'
                }
            });
        } */