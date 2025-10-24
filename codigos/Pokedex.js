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
        return `#${this.numDex} ${this.nome} ${this.regiao} Tipagem: ${this.tipos.join(", ")} favorito: ${favoritado}`    }

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

    return new status(
        numDex,
        nome,
        regiaoPadrao,
        tipos,
        false,
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

            resultado.innerHTML = `Buscando ${termo.toLowerCase()}...`;


            exibicao([termo]);
        }


        async function exibicao(identificadores)
        {
            try{
                const listaPokemons = await criarPokemons(identificadores, 'Região Desconhecida');

                if(listaPokemons && listaPokemons.length > 0)
                {
                    const pokemonEncontrado = listaPokemons[0]

                    const htmlConteudo =
                    `
                    <h2>${pokemonEncontrado.numDex} ${pokemonEncontrado.nome}</h2>
                    <p>Região: ${pokemonEncontrado.regiao}</p>
                    <p>Tipo: ${pokemonEncontrado.tipos.join(" / ")}</p>
                    <p>Favorito: ${pokemonEncontrado.favorito ? 'sim' : 'não'}</p>
                    <hr>
                    <h3>Status</h3>
                    <p>${pokemonEncontrado.mostrarValores()}</p>
                    `;

                    resultado.innerHTML = htmlConteudo;
                } else {
                    resultado.innerHTML = `<p style = "color: red;">Pokemon "${identificadores}" não encontrado. Tente outro nome/ID`
                }
            } catch (erro){
                console.error("Erro na busca e exibição: ", erro)
                resultado.innerHTML = `<p style = "color: red;">Um erro inesperado aconteceu: ${erro.messsage}</p>`
            }


        }


    if(form){
            form.addEventListener('submit', buscar)
        } else {
            console.error("Elemento não encontrado")
        }
});
document.addEventListener('DOMContentLoaded', ()=>{
    const listaPokemonsDiv = document.getElementById('listaPokemon');

    function gerarPoke(p) {
                return `
                <div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-3 tamanho">
                    <div class="card shadow-sm h-100" style="border: 2px solid #0d6efd;">
                        <div class="card-body tamanho">
                            <h5 class="card-title text-center text-primary">#${p.numDex} ${p.nome}</h5>
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

        listaPokemonsDiv.innerHTML = '<p class = "text-center">Carregando pokemons...</p>'

        try{
            const mons = await criarPokemons(identificadores, 'kanto');

            if(mons && mons.length > 0)
            {
                const htmlMons = mons.map(gerarPoke).join('');
                listaPokemonsDiv.innerHTML = '<div class = "row">${listaPokemonsDiv}</div>'
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
    
    const identificadoresIniciais = [1,2,3,4,5,6,7,8,9,10]

    if(listaPokemonsDiv)
    {
        aparecerPokemons(identificadoresIniciais);
    }
});