//import * as buscador from 'codigos\javascript\busca.js'
//import {funcoes} from './criar.js'

window.onerror = function (msg, url, line, col, error) {
    const box = document.createElement("div");
    box.style.position = "fixed";
    box.style.bottom = "0";
    box.style.left = "0";
    box.style.right = "0";
    box.style.background = "#ff4444";
    box.style.color = "white";
    box.style.padding = "10px";
    box.style.fontSize = "16px";
    box.style.zIndex = "999999";
    box.style.borderTop = "3px solid #aa0000";

    box.innerText = `ERRO: ${msg} | ${url}:${line}:${col}`;
    document.body.appendChild(box);

    return false;
};


import { iniciarGlobal } from "./global.js";
import { carregarTudoAuto } from "./lista.js";

document.addEventListener("DOMContentLoaded", () => {
    carregarTudoAuto();   // CARREGA OS POKÉMONS NA TELA
    iniciarGlobal();      // pega favs, botões, etc
});