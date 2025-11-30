//controla as variaveis globais, como por exemplo ids
import { favoritar, irFavs } from './fav.js';
import { exibicao } from './criar.js';
import * as buscas from './busca.js'
import { carregarTudoAuto } from './lista.js';

export function iniciarGlobal()
{
    var buscaLocal = localStorage.getItem('termoBusca')
    
    if(buscaLocal)
    {
        exibicao([buscaLocal]);
        localStorage.removeItem('termoBusca')
    }
//----------------------------------------------------------------------------------------------
    document.addEventListener('click', (e)=>{
            console.log('clique identificado')
            const fecharBusca = e.target.closest('#fecharBusca');

            const buscaProntaEsconder = document.getElementById('buscaPronta');

            if(fecharBusca && buscaProntaEsconder)
            {
            console.log('escondeu')
            buscaProntaEsconder.classList.add('escondido');
            }
            const btnFavorito = e.target.closest('.favorito-btn');
            if(btnFavorito)
            {
                const numDex = btnFavorito.dataset.dexId;

                favoritar(numDex)

                const icone = btnFavorito.querySelector('i');

                const estaFavorito = icone.classList.contains('fa-solid');

                icone.classList.toggle('fa-solid', !estaFavorito);
                icone.classList.toggle('fa-regular', estaFavorito);
                icone.classList.toggle('text-danger', !estaFavorito);
                icone.classList.toggle('text-secondary', estaFavorito);
            }
//----------------------------------------------------------------------------------------------
            const btnCard = e.target.closest('.card-grande');
            if(btnCard){

                const numDex = btnCard.dataset.dexId;
                console.log(`botao card grande clicado pokemon #${numDex}`);

                exibicao([numDex]);
            }
        })
        
//----------------------------------------------------------------------------------------------
        if(buscas.formHome)
        {
            buscas.formHome.addEventListener('submit',  buscas.buscarHome);
        }
//----------------------------------------------------------------------------------------------

        const btnFavHome = document.getElementById('btnFav');
        if(btnFavHome)
        {
            btnFavHome.addEventListener('click', irFavs);
        }
        
        if(buscas.form)
        {
            buscas.form.addEventListener('submit', buscas.buscarDex)
        }
//----------------------------------------------------------------------------------------------

        const btnFav = document.getElementById('favs');
        if(btnFav)
        {
            btnFav.addEventListener('click', irFavs);
        }
//----------------------------------------------------------------------------------------------
        if (buscas.btnRandom) {
        buscas.btnRandom.addEventListener('click', () => {
            console.log('Botão Random clicado!');
            buscas.aleatorio();
        });
        }
//----------------------------------------------------------------------------------------------
        if(buscas.btnDex)
        {
            buscas.btnDex.addEventListener('click', carregarTudoAuto)
        }
}
