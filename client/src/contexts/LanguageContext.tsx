import { createContext, useContext, useState, ReactNode } from 'react';
import { Lang, translations, Translations } from '@/lib/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'de',
  setLang: () => {},
  t: translations.de as unknown as Translations,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de');

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as unknown as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
