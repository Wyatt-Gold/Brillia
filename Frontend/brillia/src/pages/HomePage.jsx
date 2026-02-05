import { Link } from 'react-router-dom';

export default function HomePage() {
  const subjects = [
    {
      title: "Mathematics",
      desc: "Master numbers and problem-solving.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiZi6tOblMp85K1u7mmJN6iHpiAw9IMxoNdXy0q6_zYdfhlelXoVsOrzWlBDvyG_XE0WbCZAG0T2GRq4jo2DJWPhBZrZ8Um8cHRAMF45dmR0d6FEhQE3nAIWQWnCIy9IW5D3gy0VROJmrjglSJerKUjmyJzz7RBZ0r8iAjgZxHA1UxieTwUIwQspEnded0cbgX2PZ_OhmrGhiP-WsE5xUh2LOEbPWnRjl_D3IqbeC4obJdHpyAzhGWoyMnRtglgvCPiEyybhZSbA",
      id: "mathematics"
    },
    {
      title: "Science",
      desc: "Discover the wonders of the natural world.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBcShcrDG9RW2pEpR6VHBSh0z_ybknR25TvJ2kI73kMfOwWCQVPR1oh8nsWTI9HGnjM77Gwb6mLYBhv7Yx6GSANNfy8mnMDlrrIkQyKv7EzV-puokNRzCmFA96arbM9h--fPdy_yzheknz_oNEDIaSRZB7dLuGT9O_Czl2uF_s3KL7DUlAiqtBy7imo0Df5p64xwvCq5CQSN4KF0G_fYgjleJOgu2h4v6YHO7x0o6A6BK60jGfSjACahn98VxVKk5TByDPdJpMhw",
      id: "science"
    },
    {
      title: "Language Arts",
      desc: "Enhance your reading and writing skills.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSKd4KgYf5AE3o_6aOP5kC4B_k0V5B43vtwy8faBokeDTsGbeNJYEefVJLdfzvFPL5_Ksz1FQrtsXKulwuQvpHhc7nhn1XDSNt08sQe88QvQOh8eCwSHSHiPbaclkY0wpHy-fYoW0kDkPPrgh6QtqHbAJFxGhM48oPcrW7EsMOG6SsxukmMaTK2ynMADCe5z2uEeDZWTxncBFInFu76RFliiZwjkixnFsTqWFEKQ6j58fRYbROU2z8hsnq1HzxKmSEtpS_HS5IrA",
      id: "language-arts"
    },
    {
      title: "Social Studies",
      desc: "Explore history, geography, and cultures.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu9EBX4oxHBFUIktlm8viyt-XZBZT9LmKEBtxTljL0SMCXFRgzytpWsoxPN9msA4Fo0KpoRGNbgGqViFEmLt8Q2YcIPV3MniTh3yh5WouGYwBd5eBhrdqx0wsnWTxc6fmIcAEjCvOUa80pt_GqdR_f2A7Opgj2fk8D7na2AaciMAVkehmnb2t2RlWzhws6azjo1DS899Z9OQAZsruGXNPgmOgk1ifC8pBFgQYkKW_zDr-raD8oGe423ErNakkM6a0w8euEmhLP6Q",
      id: "social-studies"
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <header className="border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-8 w-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Brillia</h2>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary" to="/subjects">Subjects</Link>
            <a className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="#">Resources</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="#">Support</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex h-10 items-center justify-center overflow-hidden rounded-full bg-primary px-5 text-sm font-bold text-white transition-transform hover:scale-105">
              <span className="truncate">Get Started</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrxxHIMOIuDdjWns9wS0TBilB62kmM6alr4O2PU_ts6QRSmy99iHRU-VcVDX95wfXl7KyZ6UQTfY0SBrrsRZ51VPnKHYUnEvjM266LP4WKEJqBzZma9Jq-P117e3q0C4iu5dLrSfTHbYerz954U8QS6F5_cFPktRXJnCkA4OxIXbhc0s69SY2kY5e7wTKNWWy0ouVR06qA93cS4JoCN8KvrFJ9dZelORlnFcsXnuvZAq14x3Enzl2Mnw2Yuyf51n6Z0PnvVHJ4Bg")'}}></div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="@container">
            <div className="relative flex min-h-[480px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-cover bg-center p-6 text-center text-white" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSdgMsCfasRimTYusrVidznnmMOFub0JFM8MRQRrpHRy8hkiptervFtbXRZHG51TUTOIACJGETP0aKnNsjUTK2-AihDzS9uRb8A-92ixTqex435Ej_m-_95b-K7C6Cj9xQxD6_jyeZZ_Z914nyrMWEPhTouifAmVcnyuxuvskutzkK_ybevuGpvZGJsMSdtJTdpuf9hosbKi7qJGX_MLYQvgWlZNkFuf4bh4n_m6TWMH1IaP8Ggiz6UUtIjfeNbKV5Uzveiq7D-A")'}}>
              <div className="z-10 flex max-w-3xl flex-col items-center gap-4">
                <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
                  Unlock Your Potential with Brillia
                </h1>
                <p className="max-w-2xl text-base font-light text-gray-200 sm:text-lg">
                  Explore a world of knowledge with our interactive lessons and engaging activities. From math to
                  science, we've got you covered.
                </p>
                <button className="mt-4 flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg transition-transform hover:scale-105">
                  <span className="truncate">Start Learning Now</span>
                </button>
              </div>
            </div>
          </div>

          <div className="py-12 sm:py-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Explore Subjects</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/subjects/${subject.id}/lessons`}
                  className="flex flex-col gap-4 rounded-lg bg-background-light p-4 shadow-sm transition-shadow hover:shadow-lg dark:bg-background-dark dark:hover:bg-primary/10"
                >
                  <div className="aspect-video w-full rounded-lg bg-cover bg-center" style={{backgroundImage: `url("${subject.img}")`}}></div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{subject.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{subject.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">About Us</a>
            <a className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Contact</a>
            <a className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Privacy Policy</a>
            <a className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Terms of Service</a>
          </div>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">© 2024 Brillia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
