    export async function aparecerPokemons(identificadores) {
        if(!listaPokemonsDiv) return;

        try{
            const mons = await criarPokemons(identificadores);

            if(mons && mons.length > 0)
            {
                const htmlMons = mons.map(gerarPoke).join('');
                //listaPokemonsDiv.innerHTML = '<div class = "row">${listaPokemonsDiv}</div>'
                listaPokemonsDiv.innerHTML = htmlMons;
            } else {
                listaPokemonsDiv.innerHTML = '<p class = "text-center text-danger">Erro ao carregar os dados. Tente novamente.</p>';
            }
        } catch (erro)
        {
            console.error("Erro na exibicao de pokemon: ", erro);
            listaPokemonsDiv.innerHTML = '<p class = "text-center text-danger">Erro ao exibir lista de pokemons</p>';
        }
    }
