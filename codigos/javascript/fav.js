
export function obterFavs()
{
    const favsJSON = localStorage.getItem('favoritos');
    return favsJSON ? JSON.parse(favsJSON) : []
}

export function saveFav(favoritos)
{
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

export function irFavs()
{
    console.log('funcionou')
    localStorage.setItem('filtrarFavoritos', 'true');

    window.location.href = 'pokeall.html'
}
