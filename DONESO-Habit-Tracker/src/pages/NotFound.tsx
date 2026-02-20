import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Compass, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f5f7f8] font-sans flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-slate-200/50 flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Compass className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl font-black text-slate-800 tracking-tighter">404</h1>
          <h2 className="text-xl sm:text-2xl font-black text-slate-400 uppercase tracking-widest">Route Not Found</h2>
          <p className="text-slate-500 font-bold text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
            It seems you've wandered off the track. Let's get you back to your habits.
          </p>
        </div>

        <div className="pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all text-xs sm:text-sm"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            BACK TO COMMAND CENTER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
