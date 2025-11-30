
export function obterFavs()
{
    const favsJSON = localStorage.getItem('favoritos');
    return favsJSON ? JSON.parse(favsJSON) : []
}

function saveFav(favoritos)
{
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

export function irFavs()
{
    console.log('funcionou')
    localStorage.setItem('filtrarFavoritos', 'true');

    window.location.href = 'pokeall.html'
}


export function favoritar(numDex)
{
    numDex = parseInt(numDex, 10);
    let favoritos = obterFavs();

    const index = favoritos.indexOf(numDex);
    if(index > -1)
    {
        favoritos.splice(index, 1);
        console.log(`Pokemon #${numDex} removido dos favoritos`)
    } else {
        favoritos.push(numDex);
        console.log(`Pokemon #${numDex} adicionado aos favoritos`)
    }
    saveFav(favoritos);
}
