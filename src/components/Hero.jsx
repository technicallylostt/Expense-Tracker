const Hero = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-[#EEF5FF] to-[#C9EEFF] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-blue-800">Track. Save. Predict. All in one place.</h1>
      <p className="text-xl text-gray-600 mb-6">Smart expense tracking with auto- reciept parsing, budget alerts and saving challenges. </p>
      <a href="#features">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Start Tracking Now!
        </button>
      </a>
    </div>
  );
};

export default Hero;