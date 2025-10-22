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
        return `hp: ${this.hp} atk fisico: ${this.atkFisico} defesa fisica: ${this.defFisica} ataque especial: ${this.atkEspecial} defesa especial: ${this.defEspecial} velocidade: ${this.velocidade}`
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

let pokeImaginario = new status(
    0o1,//dex
    'Inexistente',//nome
    "imaginario",//regiao
    ['fogo', 'agua'],// tipos
    true, //favorito
    120, //hp
    50, //atkFisico
    200, //defFisico
    60, //atkEspecial
    60, //defEspecial
    30 //velocidade
    );
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

async function criarPokemons(dados, regiaoPadrao = 'desconhecida') {
    const linkUrl = "https://pokeapi.co/api/v2/pokemon/"

    const buscarPromise = idenficador.map(id =>
        fetch(`${linkUrl}${String(id).toLowerCase()}`)
    );

    try {
        //o await faz com que as promises sejam terminadas
        const respostas = await Promise.all(buscarPromise);

        const 
    } catch ({error}) {

    }
}
