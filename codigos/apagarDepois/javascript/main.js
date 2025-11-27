//import * as buscador from 'codigos\javascript\busca.js'
//import {funcoes} from './criar.js'



import { iniciarGlobal } from "./global";
import { buscar } from "./busca";

document.addEventListener('DOMContentLoaded', ()=>{

    iniciarGlobal();

    buscar();
})