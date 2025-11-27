//controla as buscas provavelmente vou apagar posteriormente
import { buscar } from './busca'
export function buscando(){
    const form = document.getElementById('form-busca');
    const buscador = document.getElementById('busca')
    const resultado = document.getElementById('resultado')

    if(form)
    {
        form.addEventListener('submit', buscar);
    } else {
            console.error("Elemento não encontrado")
    }
}



const btnFiltroFav = document.getElementById('favs');
    const btnMostraTudo = document.getElementById('mostrarDex')
    const btnRandom = document.getElementById('random');
