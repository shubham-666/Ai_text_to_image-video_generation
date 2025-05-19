import React from 'react';
import { UseCase } from '../types';

interface UseCaseCardProps {
  useCase: UseCase;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="h-48 overflow-hidden">
        <img 
          src={useCase.image} 
          alt={useCase.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
      </div>
      <div className="p-6">
        <div className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full mb-4">
          {useCase.industry}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h3>
        <p className="text-gray-600">{useCase.description}</p>
      </div>
    </div>
  );
};

export default UseCaseCard;