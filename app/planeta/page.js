export default async function Home({ searchParams }) {
    // Aguarda os parâmetros de pesquisa de forma assíncrona
    const planetSearchKey = searchParams?.planetSearchKey || ""; // Obtém o parâmetro de busca ou define como vazio por padrão.

    // Faz a requisição à API de exoplanetas
    const res = await fetch(
        `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=JSON&select=kepid,kepoi_name,kepler_name,koi_disposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff&where=koi_disposition%20like%20%27CONFIRMED%27&api_key=bItyuBLvFl4T3ra7mTF61MduYXtjJLjyFTjcU4mB`
    );
    const data = await res.json();

    // Filtra os planetas com base no parâmetro de busca
    const filteredPlanets = data.filter((planet) =>
        planet.kepler_name?.toLowerCase().includes(planetSearchKey.toLowerCase())
    );

    // Retorna o JSX com os resultados da pesquisa
    return (
        <div>
            <h1>Resultados para "{planetSearchKey}"</h1>
            <div>
                {filteredPlanets.length > 0 ? (
                    filteredPlanets.map((planet) => (
                        <div key={planet.kepoi_name}>
                            <strong>{planet.kepler_name}</strong> --- Período Orbital: {planet.koi_period} dias --- Tamanho: {planet.koi_prad} raios terrestres
                        </div>
                    ))
                ) : (
                    <p>Nenhum planeta encontrado.</p>
                )}
            </div>
        </div>
    );
}
