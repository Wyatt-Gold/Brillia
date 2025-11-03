import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MainScreen from "./MainScreen";

export default function Brillia() {
  const subjects = [
    {
      title: "Mathematics",
      desc: "Master numbers and problem-solving.",
      img: "https://images.unsplash.com/photo-1627637454903-9d81bb3b9e8d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Science",
      desc: "Discover the wonders of the natural world.",
      img: "https://images.unsplash.com/photo-1581093588401-22e1d1b6d0af?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Language Arts",
      desc: "Enhance your reading and writing skills.",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Social Studies",
      desc: "Explore history, geography, and cultures.",
      img: "https://images.unsplash.com/photo-1505664063603-28e48bdee5aa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Computer Science",
      desc: "Explore history, geography, and cultures.",
      img: "https://images.unsplash.com/photo-1505664063603-28e48bdee5aa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Spanish",
      desc: "Explore history, geography, and cultures.",
      img: "https://images.unsplash.com/photo-1505664063603-28e48bdee5aa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "French",
      desc: "Explore history, geography, and cultures.",
      img: "https://images.unsplash.com/photo-1505664063603-28e48bdee5aa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Government",
      desc: "Explore history, geography, and cultures.",
      img: "https://images.unsplash.com/photo-1505664063603-28e48bdee5aa?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 w-full">
      <Header />

      <div className="flex-1 mt-16 max-w-6xl mx-auto px-4">
        <MainScreen />

        {/* Subjects */}
        <section className="px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-10">Explore Subjects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((s) => (
              <div
                key={s.title}
                className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-4 text-left"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      
      

      

      <Footer />
    </div>
  );
}
