import React, { useState } from 'react';
import type { ProjectIdea } from '../types';

interface ProjectIdeaCardProps {
  idea: ProjectIdea;
  index: number;
  onLike: (id: string) => void;
  onRefine: (idea: ProjectIdea) => void;
}

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; 'aria-label': string; className?: string }> = ({ onClick, children, 'aria-label': ariaLabel, className = '' }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-brand-secondary transition-colors duration-200 ${className}`}
    >
        {children}
    </button>
);


const ProjectIdeaCard: React.FC<ProjectIdeaCardProps> = ({ idea, index, onLike, onRefine }) => {
  const [copied, setCopied] = useState(false);
  const colors = [
    'border-l-purple-500',
    'border-l-indigo-500',
    'border-l-pink-500',
  ];

  const handleExport = () => {
    const markdown = `
# ${idea.title}

## Descrição
${idea.description}

## Primeiros Passos
${idea.firstSteps.map(step => `- [ ] ${step}`).join('\n')}
    `;
    navigator.clipboard.writeText(markdown.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div 
      className={`bg-white/80 p-6 rounded-lg shadow-md border-l-4 ${colors[index % colors.length]} transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-brand-dark mb-2">{idea.title}</h3>
        <p className="text-gray-600 mb-4">{idea.description}</p>

        <h4 className="font-semibold text-gray-700 mb-2">Primeiros Passos:</h4>
        <ul className="space-y-2 list-inside">
          {idea.firstSteps.map((step, i) => (
            <li key={i} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-gray-600">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200/80">
          <ActionButton onClick={() => onLike(idea.id)} aria-label={idea.isLiked ? "Descurtir ideia" : "Curtir ideia"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={idea.isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </ActionButton>
          <ActionButton onClick={() => onRefine(idea)} aria-label="Aprofundar esta ideia">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
          </ActionButton>
          <ActionButton onClick={handleExport} aria-label="Exportar ideia" className={copied ? 'text-green-500' : ''}>
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
          </ActionButton>
      </div>
    </div>
  );
};

export default ProjectIdeaCard;
