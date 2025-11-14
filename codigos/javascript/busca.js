export function buscar(evento) {
    const buscador = document.getElementById('busca')
    const resultado = document.getElementById('resultado')
    evento.preventDefault();
    console.log('chamou nessa porra')

    let termo = buscador.value.trim();

    if(termo === "")
    {
        resultado.innerHTML = "<p>Digite o nome de um pokemon da primeira geração</p>"
        return;
    }

    localStorage.setItem('termoBusca', termo.toLowerCase())

    window.location.href = 'pokeall.html'
}