import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CallToActionProps {
  onGetStarted: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your ideas into visuals?
          </h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10">
            Get started with our AI models today and unlock limitless creative possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 transition-colors font-medium flex items-center justify-center"
            >
              <span>Get Started</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-3 rounded-lg text-white bg-transparent border border-white hover:bg-white/10 transition-colors font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;