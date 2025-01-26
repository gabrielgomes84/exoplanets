'use server';

export async function searchPlanets(formData) {
    const planetSearchKey = formData.get("planetSearchKey");

    if (!planetSearchKey || planetSearchKey.trim() === '') return [];

    const apiUrl = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=JSON&select=kepid,kepoi_name,kepler_name,koi_disposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff&where=koi_disposition%20like%20%27CONFIRMED%27`;

    try {
        const httpRes = await fetch(apiUrl);
        const jsonRes = await httpRes.json();

        return jsonRes.filter((planet) =>
            planet.kepler_name?.toLowerCase().includes(planetSearchKey.toLowerCase())
        );
    } catch (error) {
        console.error("Erro na busca por planetas:", error);
        throw new Error("Erro ao buscar planetas");
    }
}
