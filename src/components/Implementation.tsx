import React from 'react';
import { implementationSteps } from '../data/implementation';
import * as LucideIcons from 'lucide-react';

const Implementation: React.FC = () => {
  // Dynamically get the Lucide icon based on the icon name
  const getIcon = (iconName: string) => {
    return LucideIcons[iconName as keyof typeof LucideIcons];
  };
  
  return (
    <section id="implementation" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Implementation Process</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our structured approach ensures high-quality results and efficient development.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-indigo-200 -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {implementationSteps.map((step, index) => {
              const IconComponent = getIcon(step.icon as keyof typeof LucideIcons);
              const isEven = index % 2 === 0;
              
              return (
                <div key={step.id} className="flex flex-col md:flex-row items-center">
                  <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className="my-4 md:my-0 flex-shrink-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center z-10">
                      <IconComponent className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  
                  <div className={`md:w-1/2 ${isEven ? 'md:pl-12 md:order-2' : 'md:pr-12 md:text-right'}`}>
                    {/* Empty div for layout on desktop */}
                    <div className="hidden md:block">&nbsp;</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Implementation;