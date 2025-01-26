"use client";

import { searchPlanets } from "../actions/planetActions";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ClientPlanets() {
    const [planets, setPlanets] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSearch(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("planetSearchKey", searchKey.trim());

        if (!searchKey.trim()) return;

        setIsLoading(true);
        try {
            const results = await searchPlanets(formData);
            setPlanets(results);
        } catch (error) {
            console.error("Erro ao buscar planetas:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-[#0A1D2D] text-white min-h-screen flex flex-col p-4">
            <PlanetForm
                handleSearch={handleSearch}
                searchKey={searchKey}
                setSearchKey={setSearchKey}
                isLoading={isLoading}
            />
            <PlanetTable planets={planets} />
        </div>
    );
}

// Componente do formulário de busca de planetas
const PlanetForm = React.memo(({ handleSearch, searchKey, setSearchKey, isLoading }) => {
    console.log("Renderizando PlanetForm");

    return (
        <form onSubmit={handleSearch} className="bg-white p-4 shadow-lg rounded-lg">
            <label htmlFor="idPlanetSearchKey" className="block text-xl font-semibold mb-2 text-black">Nome do Planeta</label>
            <input 
                id="idPlanetSearchKey" 
                name="planetSearchKey" 
                value={searchKey} 
                onChange={(e) => setSearchKey(e.target.value)} // Atualiza o estado à medida que o usuário digita
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(e); // Dispara a pesquisa quando "Enter" for pressionado
                    }
                }}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Digite o nome do planeta"
            />
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white p-3 rounded-md disabled:bg-gray-400">
                {isLoading ? "Carregando..." : "Pesquisar"}
            </button>
        </form>
    );
});


// Componente de Tabela de Planetas

const PlanetTable = ({ planets }) => (
    <div className="mt-6">
        {planets.length > 0 ? (
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-blue-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Nome</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Período Orbital (dias)</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Tamanho (raios terrestres)</th>
                    </tr>
                </thead>
                <tbody>
                    {planets.map((planet) => (
                        <tr key={planet.kepoi_name} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-3 text-sm text-blue-600">
                                <Link href={`/planet/${planet.kepler_name}`}>
                                    {planet.kepler_name}
                                </Link>
                            </td>
                            <td className="px-6 py-3 text-sm text-black">{planet.koi_period}</td>
                            <td className="px-6 py-3 text-sm text-black">{planet.koi_prad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="text-center text-lg text-black">Nenhum planeta encontrado.</p>
        )}
    </div>
);
