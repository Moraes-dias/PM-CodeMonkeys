import { mapeamentoStatus } from "./mapeamento";

export async function criarPokemons(identificadores)
{
    const linkUrl = "https://pokeapi.co/api/v2/pokemon/"
    console.log("criarPokemons chamado com:", identificadores);
    const buscarPromise = identificadores.map(id =>
        fetch(`${linkUrl}${String(id).toLowerCase()}`)
    );
    try {
        //o await faz com que as promises sejam terminadas
        const respostas = await Promise.all(buscarPromise);
        console.log("✅ respostas recebidas:", respostas.length);

        const respostaPromise = respostas.map(resposta =>{
            if(!resposta.ok) {
                throw new Error(`Falha ao buscar ID/Nome: ${resposta.url.split('/').pop()}`);

            }
            return resposta.json();
        });

        const tudoCompleto = await Promise.all(respostaPromise);
        console.log("✅ JSONs convertidos:", tudoCompleto.length);
        const listaPokemons = await Promise.all(tudoCompleto.map(async (dados) =>{
            try{
                return await mapeamentoStatus(dados)
            } catch (err){
                console.log('erro dentro do mapeamento de dados', err)
                throw err;
            }
        })
    )
        console.log("✅ listaPokemons criada:", listaPokemons.length);
        return listaPokemons;
    } catch (erro) {
        console.error("Um erro ocorreu durante a busca de dados em lote: ", erro.message)
        return [];
    }
}
