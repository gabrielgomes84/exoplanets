export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const planetSearchKey = searchParams.get("planetSearchKey");

    const apiUrl = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=JSON&select=kepid,kepoi_name,kepler_name,koi_disposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff&where=koi_disposition%20like%20%27CONFIRMED%27`;

    try {
        const httpRes = await fetch(apiUrl);
        const jsonRes = await httpRes.json();

        const filteredPlanets = jsonRes.filter((planet) =>
            planet.kepler_name?.toLowerCase().includes(planetSearchKey.toLowerCase())
        );

        return Response.json(filteredPlanets);
    } catch (error) {
        return Response.json({ error: "Erro ao buscar os planetas." }, { status: 500 });
    }
}
