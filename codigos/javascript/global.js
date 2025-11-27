//controla as variaveis globais, como por exemplo ids
import { favoritar, irFavs } from './fav'
export function iniciarGlobal()
{
    document.addEventListener('click', (e)=>{
        console.log('clique identificado')
        const fecharBusca = e.target.closest('#fecharBusca');

        const buscaProntaEsconder = document.getElementById('buscaPronta');

        if(fecharBusca && buscaProntaEsconder)
        {
        console.log('escondeu')
        buscaProntaEsconder.classList.add('escondido');
        }
    })
    
        const btnFavorito = fav.target.closest('.favorito-btn');

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

        const btnFavHome = getElementById('btnFav');

        btnFavHome.addEventListener('click', irFavs)
}