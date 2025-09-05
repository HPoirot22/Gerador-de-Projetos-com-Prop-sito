import React, { useState, useCallback } from 'react';
import type { ProjectIdea } from './types';
import { generateProjectIdeas } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [passions, setPassions] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [objective, setObjective] = useState<string>('impacto social');
  const [experience, setExperience] = useState<string>('iniciante');
  const [timeAvailable, setTimeAvailable] = useState<string>('5-10 horas');
  const [ideaType, setIdeaType] = useState<string>('criativas');
  
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleGenerateMission = useCallback(async () => {
    if (!passions || !skills) {
      setError('Por favor, preencha os campos de paixões e habilidades.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setShowResults(false);

    try {
      const ideas = await generateProjectIdeas({
        passions,
        skills,
        objective,
        experience,
        timeAvailable,
        ideaType
      });
      setProjectIdeas(ideas);
      setShowResults(true);
    } catch (err) {
      setError('Ocorreu um erro ao gerar as ideias. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [passions, skills, objective, experience, timeAvailable, ideaType]);
  
  const handleLikeProject = (id: string) => {
    setProjectIdeas(prevIdeas => 
      prevIdeas.map(idea => 
        idea.id === id ? { ...idea, isLiked: !idea.isLiked } : idea
      )
    );
  };

  const handleRefineIdea = (idea: ProjectIdea) => {
    // Placeholder for future refinement logic
    alert(`Funcionalidade "Aprofundar Ideia" para "${idea.title}" ainda não implementada.`);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        
        <main className="mt-8 bg-white/60 backdrop-blur-sm shadow-2xl shadow-indigo-200/50 rounded-2xl p-6 sm:p-10 transition-all duration-500">
          <InputForm
            passions={passions} setPassions={setPassions}
            skills={skills} setSkills={setSkills}
            objective={objective} setObjective={setObjective}
            experience={experience} setExperience={setExperience}
            timeAvailable={timeAvailable} setTimeAvailable={setTimeAvailable}
            ideaType={ideaType} setIdeaType={setIdeaType}
            onSubmit={handleGenerateMission}
            isLoading={isLoading}
          />

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {showResults && !isLoading && !error && (
              <ResultsDisplay 
                ideas={projectIdeas} 
                onLike={handleLikeProject}
                onRefine={handleRefineIdea}
              />
            )}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>Potencializado por IA para transformar paixão em propósito.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
