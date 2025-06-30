import { useNavigate } from "react-router-dom";

function Home() {
  const navigator = useNavigate();
  
  const features = [
    {
      icon: "🎯",
      title: "Pet Classification",
      description: "Accurately identify different types of pets using advanced AI algorithms"
    },
    {
      icon: "🔍",
      title: "Object Detection",
      description: "Locate and highlight multiple pets in a single image with bounding boxes"
    },
    {
      icon: "✂️",
      title: "Image Segmentation",
      description: "Precise pixel-level segmentation to separate pets from background"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primaryDark/10"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primaryDark bg-clip-text text-transparent">
                  Pet Detector
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed">
                Unleash the power of <span className="font-semibold text-primary">AI-driven</span> pet detection
              </p>
            </div>

            <div className="mb-12">
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform your pet photos with cutting-edge computer vision technology. 
                Detect, classify, and segment your furry friends with remarkable precision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {/* <div className="w-full sm:w-auto"> */}
                {/* <Button 
                  text={
                    // <div className="flex items-center justify-center space-x-2">
                      <span>🚀 Start Analyzing Now</span>
                    // </div>
                  }
                  onClick={() => navigator("/analyze")}
                /> */}
              {/* </div> */} 
              <button 
                onClick={() => navigator("/analyze")}
                className="px-8 py-3 border-2 border-primary text-white font-semibold rounded-lg bg-primary hover:bg-primaryDark hover:text-white transition-all duration-200 flex items-center space-x-2"
              >
                <span>🚀 Start Analyzing Now</span>
              </button>
              <button 
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-200 flex items-center space-x-2"
              >
                <span>📖 Learn More</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
                <div className="text-gray-600 font-medium">Accuracy Rate</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600 font-medium">Pet Species</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-primary mb-2">&lt;3min</div>
                <div className="text-gray-600 font-medium">Processing Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="features" className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced computer vision technology provides comprehensive pet analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-2"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primaryDark/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to analyze your pet photos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">1. Upload Image</h3>
              <p className="text-gray-600">
                Simply upload your pet photo (under 500KB for best results)
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">2. AI Analysis</h3>
              <p className="text-gray-600">
                Our AI processes your image with advanced computer vision algorithms
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">3. Get Results</h3>
              <p className="text-gray-600">
                Receive detailed classification, detection, and segmentation results
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-primaryDark text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About Us
          </h2>
          <div className="w-full max-w-sm mx-auto">
            <button
              onClick={() => navigator("/about")}
              className="w-full bg-white text-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 text-lg shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span>Learn More About Pet Detector</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;