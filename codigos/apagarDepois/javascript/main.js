//import * as buscador from 'codigos\javascript\busca.js'
//import {funcoes} from './criar.js'


import { iniciarGlobal } from "./global.js";
import { carregarTudoAuto } from "./lista.js";

document.addEventListener("DOMContentLoaded", () => {
    carregarTudoAuto();   // CARREGA OS POKÉMONS NA TELA
    iniciarGlobal();      // pega favs, botões, etc
});