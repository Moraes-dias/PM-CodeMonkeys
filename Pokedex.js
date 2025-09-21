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
}   

class status extends pokemon{ 
    constructor(Numdex = 0 , psy=0 , def=0 , speed=0 , hp=0){
        this.Numdex = Numdex
        this.psy = psy
        this.def = def
        this.speed = speed
        this.hp = hp
    };
};

/*
    versão corrigida
    class status extends pokemon{ 
    constructor(Numdex = 0 , psy=0 , def=0 , speed=0 , hp=0){
    super(dex, nome, tipo); chama constructor da classe pai
        this.Numdex = Numdex;
        this.psy = psy;
        this.def = def;
        this.speed = speed;
        this.hp = hp;
    };
};

*/

class user{
    constructor(senha = 0, email='eita' , usuario='kkkkk'){
        this.senha = senha;
        this.email = email;
        this.usuario=usuario;
    }
    mostrarDadosUsuario()
    {
        return usuario: ${this.usuario} email: ${this.email}
    }
}

descricao() //metodo para mostrar as caracteristicas do pokemon
    { //linhas 15 ate 18
        return `#${this.numDex} ${this.nome} ${this.regiao} Tipagem: ${this.tipos.join(", ")} ${this.favorito}`
    }            

    mostrarValores() //mostrar somente os status
//linhas 33 ate 36
    {
        return `hp: ${this.hp} atk fisico: ${this.atkFisico} defesa fisica: ${this.defFisica} ataque especial: ${this.atkEspecial} defesa especial: ${this.defEspecial} velocidade: ${this.velocidade}`
    }


    mostrarDadosUsuario() //linhas 45 ate 48
    {
        return `usuario: ${this.usuario} email: ${this.email}`
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
        return #${this.numDex} ${this.nome} ${this.regiao} Tipagem: ${this.tipos.join(", ")} favorito: ${this.favorito}
    }                                                                 //join serve para fazer com que o vetor fique todo unido numa so string
}
class status extends pokemon
{
    constructor(numDex, nome, regiao, tipos, favorito, hp = 0,ataque = 0, defesa = 0, velocidade = 0)
    {
        super(numDex, nome, regiao, tipos, favorito); //heranca das caracteristicas da classe pai (pokemon)

        this.hp = hp;
        this.ataque = ataque;
        this.defesa = defesa;
        this.velocidade = velocidade;
    }
    mostrarValores() //mostrar somente os status
    {
        return hp: ${this.hp} ataques: ${this.ataque} defesas: ${this.defesa} velocidade: ${this.velocidade}
    }
}

let pokeImaginario = new status(
    0o1,//dex
    'Inexistente',//nome
    "imaginario",//regiao
    ['fogo', 'agua'],// tipos
    100,//hp
    100,//ataques
    100,//defesas
    100//velocidade
    );

let usuarioNovo = new user("Ali123", "umemail@gmail.com", "hihiha")
console.log(pokeImaginario.descricao())
console.log(pokeImaginario.mostrarValores())
console.log(usuarioNovo.mostrarDadosUsuario())