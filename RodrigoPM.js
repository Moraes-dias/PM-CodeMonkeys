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