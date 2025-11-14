import * as buscador from 'codigos\javascript\busca.js'
import * as construtores from 'codigos\javascript\construtores.js'



document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.getElementById('form-busca');
    if(form){
            form.addEventListener('submit', buscador.buscar)
        } else {
            console.error("Elemento não encontrado")
        }
});