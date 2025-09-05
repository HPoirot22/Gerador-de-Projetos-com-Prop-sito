import React from 'react';

interface InputFormProps {
  passions: string;
  setPassions: (value: string) => void;
  skills: string;
  setSkills: (value: string) => void;
  objective: string;
  setObjective: (value: string) => void;
  experience: string;
  setExperience: (value: string) => void;
  timeAvailable: string;
  setTimeAvailable: (value: string) => void;
  ideaType: string;
  setIdeaType: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SuggestionButton: React.FC<{ onSelect: (value: string) => void; text: string; }> = ({ onSelect, text }) => (
    <button
      type="button"
      onClick={() => onSelect(text)}
      className="px-3 py-1 text-xs font-medium text-brand-primary bg-brand-light border border-brand-primary/30 rounded-full hover:bg-indigo-100 transition-colors"
    >
      {text}
    </button>
);

const InputForm: React.FC<InputFormProps> = ({
  passions, setPassions,
  skills, setSkills,
  objective, setObjective,
  experience, setExperience,
  timeAvailable, setTimeAvailable,
  ideaType, setIdeaType,
  onSubmit, isLoading
}) => {
  const passionSuggestions = ["Sustentabilidade", "Educação", "Música", "Tecnologia", "Saúde mental", "Arte"];
  const skillSuggestions = ["Programação", "Design", "Escrita", "Marketing", "Gestão", "Comunicação"];
  
  const handleSuggestion = (setter: (value: string) => void, currentValue: string, suggestion: string) => {
    if (currentValue.trim() === '') {
      setter(suggestion);
    } else {
      setter(`${currentValue}, ${suggestion}`);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      {/* Passions and Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="passions" className="block text-sm font-medium text-gray-700 mb-2">
            Minhas Paixões
          </label>
          <textarea
            id="passions"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none bg-white/50 text-black"
            placeholder="Ex: sustentabilidade, educação infantil, música..."
            value={passions}
            onChange={(e) => setPassions(e.target.value)}
          />
           <div className="flex flex-wrap gap-2 mt-2">
              {passionSuggestions.map(s => <SuggestionButton key={s} text={s} onSelect={() => handleSuggestion(setPassions, passions, s)} />)}
          </div>
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
            Minhas Habilidades
          </label>
          <textarea
            id="skills"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none bg-white/50 text-black"
            placeholder="Ex: programação, design gráfico, escrita..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
           <div className="flex flex-wrap gap-2 mt-2">
              {skillSuggestions.map(s => <SuggestionButton key={s} text={s} onSelect={() => handleSuggestion(setSkills, skills, s)} />)}
          </div>
        </div>
      </div>
      
      {/* Optional Fields */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Ajuste Fino (Opcional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Objective */}
          <div>
            <label htmlFor="objective" className="block text-xs font-medium text-gray-600 mb-1">Objetivo</label>
            <select id="objective" value={objective} onChange={e => setObjective(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 bg-white/50 text-black">
              <option value="impacto social">Impacto Social</option>
              <option value="negócio">Negócio</option>
              <option value="hobby">Hobby</option>
              <option value="carreira">Carreira</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-xs font-medium text-gray-600 mb-1">Experiência</label>
            <select id="experience" value={experience} onChange={e => setExperience(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 bg-white/50 text-black">
              <option value="iniciante">Iniciante</option>
              <option value="intermediário">Intermediário</option>
              <option value="avançado">Avançado</option>
            </select>
          </div>
          
          {/* Time Available */}
          <div>
            <label htmlFor="time" className="block text-xs font-medium text-gray-600 mb-1">Tempo Semanal</label>
            <select id="time" value={timeAvailable} onChange={e => setTimeAvailable(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 bg-white/50 text-black">
              <option value="1-5 horas">1-5 horas</option>
              <option value="5-10 horas">5-10 horas</option>
              <option value="10+ horas">10+ horas</option>
            </select>
          </div>

          {/* Idea Type */}
          <div>
            <label htmlFor="ideaType" className="block text-xs font-medium text-gray-600 mb-1">Tipo de Ideia</label>
            <select id="ideaType" value={ideaType} onChange={e => setIdeaType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 bg-white/50 text-black">
              <option value="criativas">Criativas</option>
              <option value="realistas">Realistas</option>
              <option value="rápidas de executar">Rápidas</option>
              <option value="de longo prazo">Longo Prazo</option>
            </select>
          </div>
          
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transform hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gerando...
            </>
          ) : (
            'Gerar Missão'
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
