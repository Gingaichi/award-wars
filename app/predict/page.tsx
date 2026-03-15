// app/predict/page.tsx
export default function PredictPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative Oscar statue element */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-b from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-5xl">🏆</span>
          </div>
          <div className="absolute -top-2 -right-2 animate-pulse">
            <span className="text-4xl">⭐</span>
          </div>
        </div>
        
        {/* Main message */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
          And the Oscar goes to...
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6 font-light">
          Prediction deadlines have passed
        </p>
        
        {/* Stylish divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-amber-400"></div>
          <span className="text-amber-400 text-xl">✦</span>
          <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>
        
        {/* Secondary message */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Time to sit back, relax, and enjoy the show! 🍿
        </p>
        
        {/* Decorative film strip effect */}
        <div className="flex justify-center gap-2 mb-8 opacity-50">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-amber-300 dark:bg-amber-700 rounded-sm"></div>
          ))}
        </div>
        
        {/* Return home button */}
        <a 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span>Return to Home</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}