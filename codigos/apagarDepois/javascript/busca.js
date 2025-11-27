//aqui vai filtrar tambem
export const form = document.getElementById('form-busca');
export const buscador = document.getElementById('busca')
export const resultado = document.getElementById('resultado')
export function buscar(evento) {
        evento.preventDefault();
        

        let termo = buscador.value.trim();

        if(termo === "")
        {
            resultado.innerHTML = "<p>Digite o nome de um pokemon da primeira geração</p>"
            return;
        }
        //busca
        localStorage.setItem('termoBusca', termo.toLowerCase())

        window.location.href = 'pokeall.html'

        if(form){
                form.addEventListener('submit', buscar)
            } else {
                console.error("Elemento não encontrado")
            }
}


export function aleatorio()
    {
        const minimo = Math.ceil(1);
        const maximo = Math.floor(386);

        const idRandom = Math.floor(Math.random() * (maximo - minimo +1)) + minimo;

        exibicao([idRandom]);
    }
   