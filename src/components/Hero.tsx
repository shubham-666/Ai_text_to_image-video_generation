import React from 'react';
import { ChevronRight, Sparkles, Zap } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted, onDemo }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      </div>
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Next Generation AI Models</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            <span className="block"> Emaar Custom AI Visual</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600  via-purple-600 to-indigo-500">
              Generation Models
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Create stunning images, videos, and GIFs with our custom machine learning models.
            Transform text into visuals with unprecedented quality and control.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
            >
              <span>Get Started</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={onDemo}
              className="px-8 py-3 rounded-lg text-indigo-600 bg-white border border-indigo-200 hover:bg-indigo-50 transition-colors font-medium flex items-center justify-center"
            >
              <Zap className="mr-2 h-5 w-5" />
              <span>See Demos</span>
            </button>
          </div>
          
          <div className="mt-16 sm:mt-24">
            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-pulse flex space-x-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-200 rounded-full"></div>
                    <div className="w-12 h-12 bg-purple-200 rounded-full"></div>
                    <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
                  </div>
                  <p className="text-lg font-medium text-gray-900">Interactive Demo</p>
                  <p className="text-sm text-gray-500">Loading visualization...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;