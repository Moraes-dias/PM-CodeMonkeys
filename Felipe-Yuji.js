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