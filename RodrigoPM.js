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