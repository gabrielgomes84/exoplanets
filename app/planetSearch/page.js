import Form from "next/form";

export default async function PlanetSearchForm() {
    return (
        <Form action="/planeta">
            <label htmlFor="idPlanetSearchKey">Nome do Planeta</label>
            <input id="idPlanetSearchKey" name="planetSearchKey" />
            <button type="submit">Pesquisar</button>
        </Form>
    );
}
