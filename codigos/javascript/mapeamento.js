import { status } from "module";


/**
* mapeamento de dados da api
*@param {Object} dados//esses tres ajudam a entender o que a funcao vai fazer
*@param {string} regiaoPadrao//no caso os parametros, tipo de dado(object é JSON) e o nome do parametro/variavel
*@returns {status}//aqui é a saída esperada, no caso um objeto status
*/
export async function mapeamentoStatus(dados)
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

    //try catch para regiao
    let regiao = 'desconhecida'
    try{
        const specie =  await fetch(dados.species.url)
        const dadoEspecie = await specie.json();

        const region = await fetch(dadoEspecie.generation.url)
        const regionData = await region.json();

        regiao = regionData.main_region.name.charAt(0).toUpperCase() + regionData.main_region.name.slice(1);
    } catch(e)
    {
        console.warn(`Não foi possível buscar a região de ${nome}:`, e.message);
    }
    const favoritos = obterFavs();
    const isFavorito = favoritos.includes(numDex)
    return new status(
        numDex,
        nome,
        regiao,
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
