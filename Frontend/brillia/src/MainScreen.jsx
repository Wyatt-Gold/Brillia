export default function MainScreen() {
    return (
        <>
            {/* Hero */}
            <section className="relative rounded-xl m-8 overflow-hidden">
                <img
                src="https://images.unsplash.com/photo-1606761568499-6b63c8f64b64?auto=format&fit=crop&w=1200&q=80"
                alt="Learning illustration"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 text-center text-white py-24 px-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Unlock Your Potential with Brillia
                </h1>
                <p className="max-w-2xl mx-auto mb-6 text-lg">
                    Explore a world of knowledge with our interactive lessons and engaging
                    activities. From math to science, we've got you covered.
                </p>
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-medium">
                    Start Learning Now
                </button>
                </div>
            </section>
        </>
    )
}