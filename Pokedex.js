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
