import React from 'react';
import type { ProjectIdea } from '../types';
import ProjectIdeaCard from './ProjectIdeaCard';

interface ResultsDisplayProps {
  ideas: ProjectIdea[];
  onLike: (id: string) => void;
  onRefine: (idea: ProjectIdea) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ ideas, onLike, onRefine }) => {
  if (ideas.length === 0) {
    return null;
  }

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-brand-dark mb-6">
        Sua Missão Aguarda!
      </h2>
      <div className="space-y-6">
        {ideas.map((idea, index) => (
          <ProjectIdeaCard 
            key={idea.id} 
            idea={idea} 
            index={index}
            onLike={onLike}
            onRefine={onRefine}
          />
        ))}
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity, using a global style element.
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);


export default ResultsDisplay;
