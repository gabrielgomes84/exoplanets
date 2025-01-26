// app/planet/[name]/page.js

import React from 'react';

// Função para gerar os parâmetros estáticos
export async function generateStaticParams() {
    const apiUrl = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=JSON&select=kepid,kepoi_name,kepler_name,koi_disposition,koi_period,koi_prad,koi_teq,koi_insol,koi_steff&where=koi_disposition%20like%20%27CONFIRMED%27`;
    
    const planets = await fetch(apiUrl)
        .then((res) => res.json());

    // Retorna os parâmetros necessários para as rotas dinâmicas
    return planets.map((planet) => ({
        name: planet.kepler_name,
    }));
}

// Resto do seu código de página
export default async function PlanetPage({ params }) {
    const { name } = params; // Pegando o parâmetro dinâmico da rota

    const planet = await fetch(
        `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=JSON&select=kepoi_name,kepler_name,koi_period,koi_prad&where=koi_disposition%20like%20'CONFIRMED'%20AND%20kepler_name%20like%20%27%25${name}%25%27`
    )
        .then((res) => res.json())
        .then((data) => data[0]);

    if (!planet) {
        return (
            <div className="bg-[#0A1D2D] text-white min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Planeta não encontrado</h1>
                <p className="text-lg">Tente novamente com outro nome.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0A1D2D] text-white min-h-screen p-6">
            <h1 className="text-4xl font-bold mb-4">{planet.kepler_name}</h1>
            <p className="text-lg">
                <strong>Período Orbital:</strong> {planet.koi_period} dias
            </p>
            <p className="text-lg">
                <strong>Tamanho:</strong> {planet.koi_prad} raios terrestres
            </p>
        </div>
    );
}
