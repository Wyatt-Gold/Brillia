import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchLessonById } from "../services/api";

export default function LessonDetailPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback lesson data
  const fallbackLesson = {
    id: lessonId,
    title: "Introduction to Addition",
    description: "Learn the basics of adding numbers together",
    difficulty: "beginner",
    content: `
## What is Addition?

Addition is one of the four basic operations of arithmetic. It represents combining collections of objects together into a larger collection.

### Key Concepts

1. **Addends**: The numbers being added together
2. **Sum**: The result of adding numbers together
3. **Plus Sign (+)**: The symbol used to indicate addition

### Example

When we add 2 + 3, we get 5.

- 2 is the first addend
- 3 is the second addend
- 5 is the sum

### Practice Tips

- Start with small numbers
- Use visual aids like blocks or fingers
- Practice daily for best results
    `,
    subjectId: "mathematics",
  };

  useEffect(() => {
    async function loadLesson() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLessonById(lessonId);
        setLesson(data);
      } catch (err) {
        console.error("Failed to fetch lesson:", err);
        setError(err.message);
        // Use fallback data when API fails
        setLesson(fallbackLesson);
      } finally {
        setLoading(false);
      }
    }
    loadLesson();
  }, [lessonId]);

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[difficulty] || colors.beginner;
  };

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
            <Link className="text-sm font-medium hover:text-primary" to="/subjects">
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
          <div className="mx-auto max-w-4xl">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Subjects
              </Link>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                <span className="material-symbols-outlined align-middle mr-2">warning</span>
                Unable to connect to server. Showing cached content.
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : lesson ? (
              <div className="space-y-8">
                {/* Lesson Header */}
                <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-background-dark/50 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {lesson.title}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        {lesson.description}
                      </p>
                    </div>
                    {lesson.difficulty && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyBadge(
                          lesson.difficulty
                        )}`}
                      >
                        {lesson.difficulty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-background-dark/50 p-8">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {lesson.content ? (
                      <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                        {lesson.content.split('\n').map((line, index) => {
                          if (line.startsWith('## ')) {
                            return (
                              <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
                                {line.replace('## ', '')}
                              </h2>
                            );
                          }
                          if (line.startsWith('### ')) {
                            return (
                              <h3 key={index} className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
                                {line.replace('### ', '')}
                              </h3>
                            );
                          }
                          if (line.startsWith('- ')) {
                            return (
                              <li key={index} className="ml-4 text-gray-700 dark:text-gray-300">
                                {line.replace('- ', '')}
                              </li>
                            );
                          }
                          if (line.match(/^\d+\./)) {
                            return (
                              <li key={index} className="ml-4 text-gray-700 dark:text-gray-300 list-decimal">
                                {line.replace(/^\d+\.\s*/, '')}
                              </li>
                            );
                          }
                          if (line.trim() === '') {
                            return <br key={index} />;
                          }
                          return (
                            <p key={index} className="text-gray-700 dark:text-gray-300 mb-2">
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No content available for this lesson yet.
                      </p>
                    )}
                  </div>
                </div>

                {/* Quiz Button */}
                <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-background-dark/50 p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Ready to test your knowledge?
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Take a quiz to reinforce what you've learned in this lesson.
                      </p>
                    </div>
                    <button className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/80 transition-colors shadow-lg hover:shadow-xl">
                      Start Quiz
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4">
                  <Link
                    to={lesson.subjectId ? `/subjects/${lesson.subjectId}/lessons` : "/subjects"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Lessons
                  </Link>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-colors">
                    Next Lesson
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">
                  school
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Lesson Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  The lesson you're looking for doesn't exist or has been removed.
                </p>
                <Link
                  to="/subjects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/80 transition-colors"
                >
                  Browse Subjects
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
