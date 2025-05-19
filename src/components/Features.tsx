import React from 'react';
import { Cpu, Sparkles, Network, Sliders } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Cpu className="h-8 w-8 text-indigo-600" />,
      title: 'Advanced Neural Networks',
      description: 'Our models utilize state-of-the-art neural network architectures for superior quality and performance.'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-indigo-600" />,
      title: 'Creative Control',
      description: 'Fine-tune every aspect of generated content with precise control over style, composition, and more.'
    },
    {
      icon: <Network className="h-8 w-8 text-indigo-600" />,
      title: 'Scalable APIs',
      description: 'Integrate our models into your applications with our robust and scalable API infrastructure.'
    },
    {
      icon: <Sliders className="h-8 w-8 text-indigo-600" />,
      title: 'Customizable Training',
      description: 'Train models on your specific data for specialized visual generation capabilities.'
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful capabilities that make our AI visual generation models stand out.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-100 mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;