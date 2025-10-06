// Free Dictionary API integration
// Docs: https://dictionaryapi.dev/

export interface DictionaryWord {
  word: string;
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?: string[];
    }[];
  }[];
}

export async function fetchWordDefinition(word: string): Promise<DictionaryWord | null> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
    );
    
    if (!response.ok) {
      throw new Error('Word not found');
    }
    
    const data = await response.json();
    return data[0] as DictionaryWord;
  } catch (error) {
    console.error('Error fetching word definition:', error);
    return null;
  }
}

// Google Translate API alternative (using MyMemory Translation API - free)
export async function translateWord(
  word: string,
  sourceLang: string = 'en',
  targetLang: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${sourceLang}|${targetLang}`
    );
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }
    
    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Error translating word:', error);
    return null;
  }
}

// Combine both APIs to get word + translation
export async function fetchWordWithTranslation(
  word: string,
  targetLang: string
): Promise<{ word: string; translation: string; definition?: string } | null> {
  try {
    const [definition, translation] = await Promise.all([
      fetchWordDefinition(word),
      translateWord(word, 'en', targetLang)
    ]);
    
    if (!translation) {
      return null;
    }
    
    return {
      word,
      translation,
      definition: definition?.meanings[0]?.definitions[0]?.definition
    };
  } catch (error) {
    console.error('Error fetching word with translation:', error);
    return null;
  }
}
