export default function Loading() {
    return (
        <div className="bg-[#0A1D2D] text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl">Loading...</h1>
            <div className="loader"></div> {/* Aqui você pode adicionar um loader visual */}
        </div>
    );
}