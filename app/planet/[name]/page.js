// app/planet/[name]/page.js

import React from 'react';

export default async function PlanetPage({ params }) {
    const { name } = params; // Pegando o parâmetro dinâmico da rota

    // Realiza a busca do planeta usando o nome
    const planet = await fetch(
        `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=JSON&select=kepoi_name,kepler_name,koi_period,koi_prad&where=koi_disposition%20like%20'CONFIRMED'%20AND%20kepler_name%20like%20%27%25${name}%25%27`
    )
        .then((res) => res.json())
        .then((data) => data[0]); // Assumindo que o primeiro resultado é o mais relevante

    // Caso não encontre o planeta
    if (!planet) {
        return (
            <div className="bg-[#0A1D2D] text-white min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Planeta não encontrado</h1>
                <p className="text-lg">Tente novamente com outro nome.</p>
            </div>
        );
    }

    // Exibindo as informações do planeta
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
