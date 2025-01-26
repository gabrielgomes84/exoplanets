"use client"; // Adicionado no topo 
import Form from "next/form";

import React, { useState } from 'react';

export default function ClientPlanets() {
    const [planets, setPlanets] = useState([]); // Gerenciar os resultados
    const [searchKey, setSearchKey] = useState(""); // Gerenciar o termo de busca
    const [isLoading, setIsLoading] = useState(false);

    // Função para buscar os planetas
    async function fetchPlanets(planetSearchKey) {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/searchPlanets?planetSearchKey=${encodeURIComponent(planetSearchKey)}`);
            const data = await res.json();
    
            if (res.ok) {
                setPlanets(data); // Atualiza o estado com os resultados filtrados
            } else {
                console.error("Erro ao buscar os planetas:", data.error);
            }
        } catch (error) {
            console.error("Erro na requisição à API:", error);
        } finally {
            setIsLoading(false);
        }
    }
    // Manipula o envio do formulário
    function handleSearch(event) {
        event.preventDefault(); // Impede o comportamento padrão de navegação do formulário
        const planetSearchKey = searchKey.trim(); // Evita buscar com espaços em branco
        if (planetSearchKey) {
            fetchPlanets(planetSearchKey); // Passa o termo de busca para a função de busca
        }
    }

    return (
        <div className="bg-[#0A1D2D] text-white min-h-screen flex flex-col p-4">
            <PlanetForm 
                handleSearch={handleSearch} // Passando a função handleSearch como prop
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


// Componente para exibir os planetas em formato de tabela
function PlanetTable({ planets }) {
    return (
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
                                <td className="px-6 py-3 text-sm text-black">{planet.kepler_name}</td>
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
}