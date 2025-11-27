//aqui vai filtrar tambem

export function buscar(evento) {
        evento.preventDefault();


        let termo = buscador.value.trim();

        if(termo === "")
        {
            resultado.innerHTML = "<p>Digite o nome de um pokemon da primeira geração</p>"
            return;
        }

        localStorage.setItem('termoBusca', termo.toLowerCase())

        window.location.href = 'pokeall.html'

        if(form){
                form.addEventListener('submit', buscar)
            } else {
                console.error("Elemento não encontrado")
            }
        }
