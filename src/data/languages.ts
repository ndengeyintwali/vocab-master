export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface LanguagePair {
  from: Language;
  to: Language;
  id: string;
  name: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' }
];

export const popularLanguagePairs: LanguagePair[] = [
  {
    id: 'en-es',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'es')!,
    name: 'English → Spanish'
  },
  {
    id: 'en-fr',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'fr')!,
    name: 'English → French'
  },
  {
    id: 'en-de',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'de')!,
    name: 'English → German'
  },
  {
    id: 'en-it',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'it')!,
    name: 'English → Italian'
  },
  {
    id: 'en-pt',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'pt')!,
    name: 'English → Portuguese'
  },
  {
    id: 'en-ja',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'ja')!,
    name: 'English → Japanese'
  },
  {
    id: 'en-ko',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'ko')!,
    name: 'English → Korean'
  },
  {
    id: 'en-zh',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'zh')!,
    name: 'English → Chinese'
  },
  {
    id: 'en-ru',
    from: languages.find(l => l.code === 'en')!,
    to: languages.find(l => l.code === 'ru')!,
    name: 'English → Russian'
  }
];