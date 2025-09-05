import { GoogleGenAI, Type } from "@google/genai";
import type { ProjectIdea } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const projectIdeasSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: 'Um nome criativo e inspirador para o projeto.',
      },
      description: {
        type: Type.STRING,
        description: 'Uma breve descrição (2-3 frases) explicando o projeto e como ele combina as paixões e habilidades fornecidas.',
      },
      firstSteps: {
        type: Type.ARRAY,
        description: 'Uma lista de 3 a 5 passos acionáveis iniciais para começar o projeto.',
        items: {
          type: Type.STRING
        }
      }
    },
    required: ['title', 'description', 'firstSteps'],
  },
};

export interface GenerationParams {
  passions: string;
  skills: string;
  objective: string;
  experience: string;
  timeAvailable: string;
  ideaType: string;
}

// Omit ProjectIdea specific fields that are client-side only
type GeminiProjectIdea = Omit<ProjectIdea, 'id' | 'isLiked'>;

export const generateProjectIdeas = async (params: GenerationParams): Promise<ProjectIdea[]> => {
  const { passions, skills, objective, experience, timeAvailable, ideaType } = params;

  const prompt = `
    Analise o perfil de um usuário para gerar ideias de projetos com propósito.

    **Perfil do Usuário:**
    - **Paixões:** "${passions}"
    - **Habilidades:** "${skills}"
    - **Objetivo Principal:** "${objective}" (Ex: impacto social, negócio, hobby, carreira)
    - **Nível de Experiência:** "${experience}" (Ex: iniciante, intermediário, avançado)
    - **Tempo Disponível:** "${timeAvailable}" por semana
    - **Tipo de Ideia Desejada:** "${ideaType}" (Ex: criativas, realistas, rápidas de executar, de longo prazo)

    **Sua Tarefa:**
    Gere exatamente 3 ideias de projetos únicas e inspiradoras que combinem criativamente as informações do perfil.
    Cada ideia deve incluir:
    1.  **Um título criativo.**
    2.  **Uma descrição concisa** que explique o projeto e seu alinhamento com o perfil.
    3.  **Uma lista de 3 a 5 "Primeiros Passos"** - ações concretas e iniciais para tirar a ideia do papel, adequadas ao nível de experiência do usuário.

    Responda estritamente no formato JSON, de acordo com o schema fornecido.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: projectIdeasSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const ideasFromAI = JSON.parse(jsonText) as GeminiProjectIdea[];
    
    if (!Array.isArray(ideasFromAI) || ideasFromAI.length === 0) {
      throw new Error("A resposta da IA não continha ideias de projeto válidas.");
    }
    
    // Add client-side properties
    return ideasFromAI.map(idea => ({
        ...idea,
        id: crypto.randomUUID(),
        isLiked: false,
    }));

  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw new Error("Falha na comunicação com o serviço de IA.");
  }
};
