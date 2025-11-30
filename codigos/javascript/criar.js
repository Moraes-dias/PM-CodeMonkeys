import { criarPokemons } from './api.js';
//vai chamar criarPoke e vai criar os cards e row
export function gerarPoke(p) {
    const coracao = p.favorito ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart text-secondary'

            return `
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-3">
                <div class="card shadow-sm h-100" style="border: 2px solid #0d6efd;">
                    <div class="card-body">
                        <div class = "text-center">
                            <button class = "card-grande" data-dex-id="${p.numDex}" style = "border:none; background:none;">
                                <img src = ${p.spritesPronto}>
                            </button>
                        </div>
                        <div class = "d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-center text-primary">#${p.numDex} ${p.nome}</h5>
                            <button class = "btn btn-sm p-0 favorito-btn" data-dex-id="${p.numDex}" style = "border: none; background: none;">
                                <i class = "${coracao} fs-4"></i>
                            </button>
                        </div>
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

export async function exibicao(identificadores)
    {
        const resultadoBuscaDiv = document.getElementById(`buscaPronta`)

        if(!resultadoBuscaDiv)
            {
                console.log('nao foi')
                return;
            } //cancelamento funcao


        resultadoBuscaDiv.classList.remove('escondido')
        resultadoBuscaDiv.innerHTML = '<p class= "text-center">Buscando Pokemon...</p>'

        try{
            const listaPokemons = await criarPokemons(identificadores, 'Região desconhecida')

            if(listaPokemons && listaPokemons.length > 0)
            {
                const achou = listaPokemons[0];
                if(achou.numDex > 386) // Verifica o numDex do Pokémon
                {
                    // Lança um erro customizado que será capturado pelo bloco catch
                    throw new Error(`O Pokémon #${achou.numDex} (${achou.nome}) está além do limite de 386!`);
                }
                const coracaoBusca = achou.favorito ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart text-secondary'

                const conteudoAchou = `
                        <div class="card shadow-lg h-100 border-success">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4 class="card-title text-center text-success mb-0">${achou.nome.toUpperCase()}</h4>
                                    <div class="d-flex align-items-center gap-2">
                                        <button class="btn btn-sm p-0 favorito-btn" data-dex-id="${achou.numDex}" style="border: none; background: none;">
                                            <i class="${coracaoBusca} fs-4"></i>
                                        </button>
                                        <button class="btn btn-sm p-0" id="fecharBusca">
                                            <i class="fa-solid fa-xmark fs-4 text-secondary"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <hr>

                                <div class="d-flex justify-content-center align-items-center my-3">
                                    <img src="${achou.spritesPronto}" class="img-fluid" alt="${achou.nome}" style="width: 150px; height: 150px; object-fit: contain;">
                                </div>

                                <hr>
                                
                                <p><strong>#${achou.numDex}</strong></p>
                                <p><strong>Região: </strong>${achou.regiao}</p>
                                <p><strong>Tipo: </strong>${achou.tipos.join(" / ")}</p>
                                <p><strong>Favorito: </strong>${achou.favorito ? 'Sim' : 'Não'}</p>
                                
                                <h5 class="mt-3 text-success">Status Base</h5>
                                <div class="p-2 bg-light rounded border">
                                    <p class="mb-0 small">${achou.mostrarValores()}</p>
                                </div>
                            </div>
                        </div>
                `;
                resultadoBuscaDiv.innerHTML = conteudoAchou;
            } else {
                resultadoBuscaDiv.innerHTML = `<p class = "alert alert-danger">Pokemon"${identificadores[0]}" não encontrado </p>`
            }
        } catch (erro) {
            console.error("Erro na busca e exibição única: ", erro);
            resultadoBuscaDiv.innerHTML  = `<p class = "alert alert-danger">Erro inesperado ao buscar pokemon</p>`
        }
    }
