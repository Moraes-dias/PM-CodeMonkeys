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
        return `#${this.numDex} ${this.nome} ${this.regiao} Tipagem: ${this.tipos.join(", ")} ${this.favorito}`
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

let usuarioNovo = new user("Ali123", "umemail@gmail.com", "hihiha")
console.log(pokeImaginario.descricao())
console.log(pokeImaginario.mostrarValores())
console.log(usuarioNovo.mostrarDadosUsuario())

