import { Link, useParams } from "react-router-dom";

export default function LessonsPage() {
  const { subjectId } = useParams();

  const subjectsData = {
    mathematics: {
      name: "Mathematics",
      icon: "calculate",
    },
    science: {
      name: "Science",
      icon: "science",
    },
    "language-arts": {
      name: "English Language Arts",
      icon: "menu_book",
    },
    "social-studies": {
      name: "Social Studies",
      icon: "public",
    },
    music: {
      name: "Music",
      icon: "music_note",
    },
    art: {
      name: "Art",
      icon: "brush",
    },
    "computer-science": {
      name: "Computer Science",
      icon: "code",
    },
    other: {
      name: "Other",
      icon: "extension",
    },
  };

  const allSubjects = Object.entries(subjectsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-[#18272e] dark:text-white">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link className="flex items-center space-x-2" to="/">
                <span className="material-symbols-outlined text-primary text-3xl">
                  school
                </span>
                <span className="text-xl font-bold">Brillia</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  className="text-sm font-medium hover:text-primary transition-colors"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="text-sm font-medium text-primary"
                  to="/lessons"
                >
                  Subjects
                </Link>
                <a
                  className="text-sm font-medium hover:text-primary transition-colors"
                  href="#"
                >
                  Resources
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <label className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#46555c] dark:text-[#a0b3be]">
                    search
                  </span>
                  <input
                    className="rounded-full bg-[#e8eaed] dark:bg-[#1a2b34] pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 md:w-56 transition-all duration-300 focus:w-48 md:focus:w-64"
                    placeholder="Search..."
                    type="search"
                  />
                </label>
              </div>
              <button className="p-2 rounded-full hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div
                className="size-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvRhEIF_I_J6qyq_PuNFXraoMefmGycb49KICuxlAbjMQSzEGVgSaKl0ipv74ajWdMVggbAuZ3xU-h6YqCtr3-VO7dxS3NdrP7goP18Wc2Fgs3CDMGd6G53BxhnvskWKQivYZ3JOEZeDI4s2hMWWUXPbaBGNVSGinmwyuBTWJrRjj97eDYIxaytIJUSBCL4_PRCGZuUe9rU2gDvC_8RS7zH45nI-khfoH_7c9w_dITVK3ikNcUW-6GfxshQTHWRN6VE169iewpHQ")',
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Explore Subjects
          </h1>
          <p className="text-lg text-[#46555c] dark:text-[#a0b3be]">
            Choose a subject to start learning
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allSubjects.map((subject) => (
            <Link
              key={subject.id}
              className="group block p-6 rounded-xl bg-white dark:bg-[#1a2b34] border border-[#e8eaed] dark:border-[#2a3b44] hover:border-primary dark:hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              to={`/lessons/${subject.id}/topics`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center size-16 mb-4 rounded-lg bg-primary/20 text-primary text-3xl">
                  <span className="material-symbols-outlined">
                    {subject.icon}
                  </span>
                </div>
                <h2 className="text-lg font-bold">{subject.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
