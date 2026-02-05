import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchLessonsBySubject } from "../services/api";

export default function LessonsPage() {
  const { subjectId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const subjectNames = {
    mathematics: "Math",
    science: "Science",
    "language-arts": "Language Arts",
    "social-studies": "Social Studies",
    music: "Music",
    art: "Art",
    "computer-science": "Computer Science",
    other: "Other",
  };

  // Fallback lessons when API is unavailable
  const fallbackLessons = [
    {
      id: 1,
      title: "Introduction to Addition",
      description: "Learn the basics",
      status: "completed",
    },
    {
      id: 2,
      title: "Adding Single Digits",
      description: "Practice with small numbers",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Adding Double Digits",
      description: "Moving to bigger numbers",
      status: "locked",
    },
    {
      id: 4,
      title: "Word Problems",
      description: "Applying your skills",
      status: "locked",
    },
    {
      id: 5,
      title: "Review and Practice",
      description: "Test your knowledge",
      status: "locked",
    },
  ];

  useEffect(() => {
    async function loadLessons() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLessonsBySubject(subjectId);
        setLessons(data);
      } catch (err) {
        console.error("Failed to fetch lessons:", err);
        setError(err.message);
        // Use fallback data when API fails
        setLessons(fallbackLessons);
      } finally {
        setLoading(false);
      }
    }
    loadLessons();
  }, [subjectId]);

  // Calculate progress
  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const progressPercentage = lessons.length > 0
    ? Math.round((completedCount / lessons.length) * 100)
    : 0;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200/80 dark:border-gray-700/80 px-10 py-4">
          <Link to="/" className="flex items-center gap-4">
            <div className="size-8 text-primary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold">Brillia</h2>
          </Link>
          <nav className="flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-primary" to="/">
              Dashboard
            </Link>
            <Link className="text-sm font-medium text-primary" to="/subjects">
              Subjects
            </Link>
            <a className="text-sm font-medium hover:text-primary" href="#">
              Resources
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <span className="material-symbols-outlined text-2xl text-gray-600 dark:text-gray-400">
                notifications
              </span>
            </button>
            <div
              className="size-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTUlx-M1E3J5Fp7DogRj41fjKmq4xKDSzF8_pSFhtuwzcFH-kSV0mJAeM7al6zQrt-EqfrrgA0-m_qq1b3pqe-CLwA9DH62bQYX0x1zkYvlECqYR3yYTprD2x9BbNnB9cEuLepK0z9SwJkXUyltyp8gj-dSyf-tJmZqCEZll7reZdpFwXMWEL9GF5G7e3GJElap5e6RRcNV7SzaW0dpiOkSalcYxWySMXsKpFGsB9HY25K7pdvEKjPFZp_ls6d-y-TUDcKGDqIDA")',
              }}
            ></div>
          </div>
        </header>

        <main className="flex-1 px-10 py-8 lg:px-20 xl:px-40">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <nav className="text-sm font-medium">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link
                      className="text-gray-500 dark:text-gray-400 hover:text-primary"
                      to="/subjects"
                    >
                      Subjects
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-400 dark:text-gray-500">/</span>
                  </li>
                  <li>
                    <span className="text-gray-800 dark:text-gray-200">
                      {subjectNames[subjectId] || "Subject"}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Unit 1
                </p>
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
                  {subjectNames[subjectId] || "Lessons"}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Progress
                </span>
                <div className="w-32 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {progressPercentage}%
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                <span className="material-symbols-outlined align-middle mr-2">warning</span>
                Unable to connect to server. Showing cached lessons.
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Pre-requisites Section */}
                <div className="rounded-lg border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-background-dark/50">
                  <div className="px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Pre-requisites
                    </h2>
                    <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
                      <li>Basic counting skills</li>
                      <li>Understanding of numbers 0-10</li>
                    </ul>
                  </div>
                </div>

                {/* Lessons Section */}
                <div className="rounded-lg border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-background-dark/50">
                  <div className="px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Lessons
                    </h2>
                  </div>
                  <ul className="divide-y divide-gray-200/80 dark:divide-gray-700/80">
                    {lessons.map((lesson) => (
                      <li key={lesson.id} className="group">
                        <Link
                          className={`block hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200 ${
                            lesson.status === "locked"
                              ? "opacity-50 cursor-not-allowed pointer-events-none"
                              : ""
                          }`}
                          to={lesson.status !== "locked" ? `/lessons/${lesson.id}` : ""}
                        >
                          <div className="flex items-center justify-between px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                                  lesson.status === "locked"
                                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                    : "bg-primary/10 dark:bg-primary/20 text-primary"
                                }`}
                              >
                                {lesson.id}
                              </div>
                              <div>
                                <p
                                  className={`font-semibold ${
                                    lesson.status === "locked"
                                      ? "text-gray-500 dark:text-gray-400"
                                      : "text-gray-800 dark:text-gray-200"
                                  }`}
                                >
                                  {lesson.title}
                                </p>
                                <p
                                  className={`text-sm ${
                                    lesson.status === "locked"
                                      ? "text-gray-400 dark:text-gray-500"
                                      : "text-gray-500 dark:text-gray-400"
                                  }`}
                                >
                                  {lesson.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {lesson.status === "completed" && (
                                <span className="material-symbols-outlined text-2xl text-green-500">
                                  check_circle
                                </span>
                              )}
                              {lesson.status === "in-progress" && (
                                <span className="material-symbols-outlined text-2xl text-primary">
                                  radio_button_checked
                                </span>
                              )}
                              {lesson.status === "locked" && (
                                <span className="material-symbols-outlined text-2xl text-gray-400 dark:text-gray-600">
                                  lock
                                </span>
                              )}
                              <span
                                className={`material-symbols-outlined text-2xl ${
                                  lesson.status === "locked"
                                    ? "text-gray-400 dark:text-gray-500"
                                    : "text-gray-400 dark:text-gray-500 group-hover:text-primary"
                                } transition-colors duration-200`}
                              >
                                chevron_right
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps Section */}
                <div className="rounded-lg border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-background-dark/50">
                  <div className="px-6 py-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      Next Steps
                    </h2>
                    <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
                      <li>Practice with double digit addition</li>
                      <li>Try word problems for real-life application</li>
                    </ul>
                  </div>
                </div>

                {/* Quiz Placeholder Section */}
                <div className="rounded-lg border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-background-dark/50">
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Quiz
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Test your knowledge with a short quiz after completing the
                        lessons.
                      </p>
                    </div>
                    <button className="px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/80 transition-colors">
                      Start Quiz
                    </button>
                  </div>
                </div>

                {/* Go to Next Unit Section */}
                <div className="mt-12 flex justify-end">
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-lg shadow hover:bg-primary/80 transition-colors"
                  >
                    Next Unit
                    <span className="material-symbols-outlined text-2xl">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
