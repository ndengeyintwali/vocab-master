export interface Question {
  id: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswer: string;
  explanation?: string;
  type: 'translate' | 'meaning';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface VocabularySet {
  languagePairId: string;
  questions: Question[];
}

export const vocabularySets: VocabularySet[] = [
  // English to Spanish
  {
    languagePairId: 'en-es',
    questions: [
      {
        id: 'en-es-1',
        question: 'Cat',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Animals',
        correctAnswer: 'Gato',
        options: [
          { id: 'a', text: 'Perro', isCorrect: false },
          { id: 'b', text: 'Gato', isCorrect: true },
          { id: 'c', text: 'Casa', isCorrect: false },
          { id: 'd', text: 'Agua', isCorrect: false },
        ],
        explanation: 'Cat translates to "Gato" in Spanish.'
      },
      {
        id: 'en-es-2',
        question: 'Hello',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Greetings',
        correctAnswer: 'Hola',
        options: [
          { id: 'a', text: 'Hola', isCorrect: true },
          { id: 'b', text: 'Adiós', isCorrect: false },
          { id: 'c', text: 'Gracias', isCorrect: false },
          { id: 'd', text: 'Por favor', isCorrect: false },
        ],
        explanation: 'Hello is the most common greeting, "Hola" in Spanish.'
      },
      {
        id: 'en-es-3',
        question: 'Water',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Nature',
        correctAnswer: 'Agua',
        options: [
          { id: 'a', text: 'Fuego', isCorrect: false },
          { id: 'b', text: 'Tierra', isCorrect: false },
          { id: 'c', text: 'Agua', isCorrect: true },
          { id: 'd', text: 'Aire', isCorrect: false },
        ],
        explanation: 'Water translates to "Agua" in Spanish.'
      },
      {
        id: 'en-es-4',
        question: 'House',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Buildings',
        correctAnswer: 'Casa',
        options: [
          { id: 'a', text: 'Coche', isCorrect: false },
          { id: 'b', text: 'Casa', isCorrect: true },
          { id: 'c', text: 'Escuela', isCorrect: false },
          { id: 'd', text: 'Trabajo', isCorrect: false },
        ],
        explanation: 'House translates to "Casa" in Spanish.'
      },
      {
        id: 'en-es-5',
        question: 'Thank you',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Politeness',
        correctAnswer: 'Gracias',
        options: [
          { id: 'a', text: 'De nada', isCorrect: false },
          { id: 'b', text: 'Por favor', isCorrect: false },
          { id: 'c', text: 'Gracias', isCorrect: true },
          { id: 'd', text: 'Perdón', isCorrect: false },
        ],
        explanation: 'Thank you translates to "Gracias" in Spanish.'
      },
      {
        id: 'en-es-6',
        question: 'Dog',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Animals',
        correctAnswer: 'Perro',
        options: [
          { id: 'a', text: 'Gato', isCorrect: false },
          { id: 'b', text: 'Perro', isCorrect: true },
          { id: 'c', text: 'Pájaro', isCorrect: false },
          { id: 'd', text: 'Pez', isCorrect: false },
        ],
        explanation: 'Dog translates to "Perro" in Spanish.'
      },
      {
        id: 'en-es-7',
        question: 'Red',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Colors',
        correctAnswer: 'Rojo',
        options: [
          { id: 'a', text: 'Azul', isCorrect: false },
          { id: 'b', text: 'Verde', isCorrect: false },
          { id: 'c', text: 'Rojo', isCorrect: true },
          { id: 'd', text: 'Amarillo', isCorrect: false },
        ],
        explanation: 'Red translates to "Rojo" in Spanish.'
      },
      {
        id: 'en-es-8',
        question: 'Book',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Objects',
        correctAnswer: 'Libro',
        options: [
          { id: 'a', text: 'Mesa', isCorrect: false },
          { id: 'b', text: 'Silla', isCorrect: false },
          { id: 'c', text: 'Libro', isCorrect: true },
          { id: 'd', text: 'Ventana', isCorrect: false },
        ],
        explanation: 'Book translates to "Libro" in Spanish.'
      },
      {
        id: 'en-es-9',
        question: 'Good morning',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Greetings',
        correctAnswer: 'Buenos días',
        options: [
          { id: 'a', text: 'Buenas noches', isCorrect: false },
          { id: 'b', text: 'Buenos días', isCorrect: true },
          { id: 'c', text: 'Buenas tardes', isCorrect: false },
          { id: 'd', text: 'Hasta luego', isCorrect: false },
        ],
        explanation: 'Good morning translates to "Buenos días" in Spanish.'
      },
      {
        id: 'en-es-10',
        question: 'Food',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Food',
        correctAnswer: 'Comida',
        options: [
          { id: 'a', text: 'Bebida', isCorrect: false },
          { id: 'b', text: 'Comida', isCorrect: true },
          { id: 'c', text: 'Plato', isCorrect: false },
          { id: 'd', text: 'Mesa', isCorrect: false },
        ],
        explanation: 'Food translates to "Comida" in Spanish.'
      }
    ]
  },
  // English to French
  {
    languagePairId: 'en-fr',
    questions: [
      {
        id: 'en-fr-1',
        question: 'Cat',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Animals',
        correctAnswer: 'Chat',
        options: [
          { id: 'a', text: 'Chien', isCorrect: false },
          { id: 'b', text: 'Chat', isCorrect: true },
          { id: 'c', text: 'Maison', isCorrect: false },
          { id: 'd', text: 'Eau', isCorrect: false },
        ],
        explanation: 'Cat translates to "Chat" in French.'
      },
      {
        id: 'en-fr-2',
        question: 'Hello',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Greetings',
        correctAnswer: 'Bonjour',
        options: [
          { id: 'a', text: 'Bonjour', isCorrect: true },
          { id: 'b', text: 'Au revoir', isCorrect: false },
          { id: 'c', text: 'Merci', isCorrect: false },
          { id: 'd', text: 'S\'il vous plaît', isCorrect: false },
        ],
        explanation: 'Hello translates to "Bonjour" in French.'
      },
      {
        id: 'en-fr-3',
        question: 'Water',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Nature',
        correctAnswer: 'Eau',
        options: [
          { id: 'a', text: 'Feu', isCorrect: false },
          { id: 'b', text: 'Terre', isCorrect: false },
          { id: 'c', text: 'Eau', isCorrect: true },
          { id: 'd', text: 'Air', isCorrect: false },
        ],
        explanation: 'Water translates to "Eau" in French.'
      },
      {
        id: 'en-fr-4',
        question: 'House',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Buildings',
        correctAnswer: 'Maison',
        options: [
          { id: 'a', text: 'Voiture', isCorrect: false },
          { id: 'b', text: 'Maison', isCorrect: true },
          { id: 'c', text: 'École', isCorrect: false },
          { id: 'd', text: 'Travail', isCorrect: false },
        ],
        explanation: 'House translates to "Maison" in French.'
      },
      {
        id: 'en-fr-5',
        question: 'Thank you',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Politeness',
        correctAnswer: 'Merci',
        options: [
          { id: 'a', text: 'De rien', isCorrect: false },
          { id: 'b', text: 'S\'il vous plaît', isCorrect: false },
          { id: 'c', text: 'Merci', isCorrect: true },
          { id: 'd', text: 'Pardon', isCorrect: false },
        ],
        explanation: 'Thank you translates to "Merci" in French.'
      },
      {
        id: 'en-fr-6',
        question: 'Dog',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Animals',
        correctAnswer: 'Chien',
        options: [
          { id: 'a', text: 'Chat', isCorrect: false },
          { id: 'b', text: 'Chien', isCorrect: true },
          { id: 'c', text: 'Oiseau', isCorrect: false },
          { id: 'd', text: 'Poisson', isCorrect: false },
        ],
        explanation: 'Dog translates to "Chien" in French.'
      },
      {
        id: 'en-fr-7',
        question: 'Red',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Colors',
        correctAnswer: 'Rouge',
        options: [
          { id: 'a', text: 'Bleu', isCorrect: false },
          { id: 'b', text: 'Vert', isCorrect: false },
          { id: 'c', text: 'Rouge', isCorrect: true },
          { id: 'd', text: 'Jaune', isCorrect: false },
        ],
        explanation: 'Red translates to "Rouge" in French.'
      },
      {
        id: 'en-fr-8',
        question: 'Book',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Objects',
        correctAnswer: 'Livre',
        options: [
          { id: 'a', text: 'Table', isCorrect: false },
          { id: 'b', text: 'Chaise', isCorrect: false },
          { id: 'c', text: 'Livre', isCorrect: true },
          { id: 'd', text: 'Fenêtre', isCorrect: false },
        ],
        explanation: 'Book translates to "Livre" in French.'
      }
    ]
  },
  // English to German
  {
    languagePairId: 'en-de',
    questions: [
      {
        id: 'en-de-1',
        question: 'Cat',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Animals',
        correctAnswer: 'Katze',
        options: [
          { id: 'a', text: 'Hund', isCorrect: false },
          { id: 'b', text: 'Katze', isCorrect: true },
          { id: 'c', text: 'Haus', isCorrect: false },
          { id: 'd', text: 'Wasser', isCorrect: false },
        ],
        explanation: 'Cat translates to "Katze" in German.'
      },
      {
        id: 'en-de-2',
        question: 'Hello',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Greetings',
        correctAnswer: 'Hallo',
        options: [
          { id: 'a', text: 'Hallo', isCorrect: true },
          { id: 'b', text: 'Auf Wiedersehen', isCorrect: false },
          { id: 'c', text: 'Danke', isCorrect: false },
          { id: 'd', text: 'Bitte', isCorrect: false },
        ],
        explanation: 'Hello translates to "Hallo" in German.'
      },
      {
        id: 'en-de-3',
        question: 'Water',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Nature',
        correctAnswer: 'Wasser',
        options: [
          { id: 'a', text: 'Feuer', isCorrect: false },
          { id: 'b', text: 'Erde', isCorrect: false },
          { id: 'c', text: 'Wasser', isCorrect: true },
          { id: 'd', text: 'Luft', isCorrect: false },
        ],
        explanation: 'Water translates to "Wasser" in German.'
      },
      {
        id: 'en-de-4',
        question: 'House',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Buildings',
        correctAnswer: 'Haus',
        options: [
          { id: 'a', text: 'Auto', isCorrect: false },
          { id: 'b', text: 'Haus', isCorrect: true },
          { id: 'c', text: 'Schule', isCorrect: false },
          { id: 'd', text: 'Arbeit', isCorrect: false },
        ],
        explanation: 'House translates to "Haus" in German.'
      },
      {
        id: 'en-de-5',
        question: 'Thank you',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Politeness',
        correctAnswer: 'Danke',
        options: [
          { id: 'a', text: 'Bitte schön', isCorrect: false },
          { id: 'b', text: 'Bitte', isCorrect: false },
          { id: 'c', text: 'Danke', isCorrect: true },
          { id: 'd', text: 'Entschuldigung', isCorrect: false },
        ],
        explanation: 'Thank you translates to "Danke" in German.'
      }
    ]
  },
  // English to Japanese
  {
    languagePairId: 'en-ja',
    questions: [
      {
        id: 'en-ja-1',
        question: 'Cat',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Animals',
        correctAnswer: '猫 (ねこ)',
        options: [
          { id: 'a', text: '犬 (いぬ)', isCorrect: false },
          { id: 'b', text: '猫 (ねこ)', isCorrect: true },
          { id: 'c', text: '家 (いえ)', isCorrect: false },
          { id: 'd', text: '水 (みず)', isCorrect: false },
        ],
        explanation: 'Cat translates to "猫 (ねこ)" in Japanese.'
      },
      {
        id: 'en-ja-2',
        question: 'Hello',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Greetings',
        correctAnswer: 'こんにちは',
        options: [
          { id: 'a', text: 'こんにちは', isCorrect: true },
          { id: 'b', text: 'さようなら', isCorrect: false },
          { id: 'c', text: 'ありがとう', isCorrect: false },
          { id: 'd', text: 'すみません', isCorrect: false },
        ],
        explanation: 'Hello translates to "こんにちは" in Japanese.'
      },
      {
        id: 'en-ja-3',
        question: 'Water',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Nature',
        correctAnswer: '水 (みず)',
        options: [
          { id: 'a', text: '火 (ひ)', isCorrect: false },
          { id: 'b', text: '土 (つち)', isCorrect: false },
          { id: 'c', text: '水 (みず)', isCorrect: true },
          { id: 'd', text: '空気 (くうき)', isCorrect: false },
        ],
        explanation: 'Water translates to "水 (みず)" in Japanese.'
      },
      {
        id: 'en-ja-4',
        question: 'House',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Buildings',
        correctAnswer: '家 (いえ)',
        options: [
          { id: 'a', text: '車 (くるま)', isCorrect: false },
          { id: 'b', text: '家 (いえ)', isCorrect: true },
          { id: 'c', text: '学校 (がっこう)', isCorrect: false },
          { id: 'd', text: '仕事 (しごと)', isCorrect: false },
        ],
        explanation: 'House translates to "家 (いえ)" in Japanese.'
      },
      {
        id: 'en-ja-5',
        question: 'Thank you',
        type: 'translate',
        difficulty: 'beginner',
        category: 'Politeness',
        correctAnswer: 'ありがとう',
        options: [
          { id: 'a', text: 'どういたしまして', isCorrect: false },
          { id: 'b', text: 'お願いします', isCorrect: false },
          { id: 'c', text: 'ありがとう', isCorrect: true },
          { id: 'd', text: 'すみません', isCorrect: false },
        ],
        explanation: 'Thank you translates to "ありがとう" in Japanese.'
      }
    ]
  }
];

export function getQuestionsForLanguagePair(languagePairId: string): Question[] {
  const vocabularySet = vocabularySets.find(set => set.languagePairId === languagePairId);
  return vocabularySet?.questions || [];
}