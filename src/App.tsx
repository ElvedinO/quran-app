'use client';

import { useState, useEffect } from 'react';
import { Search, Info } from 'lucide-react';
import { surahs } from './components/data/surahs';
import { languages } from './components/data/languages';
import { translations } from './components/data/translations';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

export default function QuranSearch() {
  const [keyword, setKeyword] = useState('');
  const [surah, setSurah] = useState('all');
  const [language, setLanguage] = useState('en');
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    setT(
      translations[language as keyof typeof translations] || translations.en
    );
  }, [language]);

  const handleSearch = async () => {
    if (!keyword) return;
    setIsLoading(true);
    const url = `https://api.alquran.cloud/v1/search/${encodeURIComponent(
      keyword
    )}/${surah}/${language}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.code === 200 && data.data && data.data.matches) {
        setResults(data.data.matches);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const highlightKeyword = (text: string) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className='bg-yellow-200 dark:bg-yellow-800'>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className='container mx-auto p-4 max-w-4xl'
      dir={language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'}
    >
      <Card className='w-full'>
        <CardHeader className='bg-gradient-to-r from-green-500 to-green-600 text-white'>
          <CardTitle className='text-3xl font-bold'>{t.title}</CardTitle>
          <CardDescription className='text-green-100'>
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent className='mt-6'>
          <Alert className='mb-6'>
            <Info className='h-4 w-4' />
            <AlertTitle>{t.howToUse}</AlertTitle>
            <AlertDescription>
              1. {t.step1} <br />
              2. {t.step2} <br />
              3. {t.step3} <br />
              4. {t.step4}
            </AlertDescription>
          </Alert>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Input
                placeholder={t.enterKeyword}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='flex-grow'
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='h-5 w-5 text-gray-400' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.keywordTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='flex space-x-4'>
              <div className='w-1/2'>
                <Select value={surah} onValueChange={setSurah}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectSurah} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>{t.allSurahs}</SelectItem>
                    {surahs.map((surah) => (
                      <SelectItem
                        key={surah.number}
                        value={surah.number.toString()}
                      >
                        {language === 'ar'
                          ? `سورة ${surah.name}`
                          : `Surah ${surah.number} - ${surah.name} (${surah.englishName})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='w-1/2'>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectLanguage} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className='w-full bg-green-600 hover:bg-green-700 text-white'
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className='mr-2'>{t.searching}</span>
                <span className='animate-spin'>⏳</span>
              </>
            ) : (
              <>
                <Search className='mr-2 h-4 w-4' /> {t.searchButton}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      {results !== null && (
        <Card className='w-full mt-6'>
          <CardHeader>
            <CardTitle>{t.searchResults}</CardTitle>
            <CardDescription>
              {results.length}{' '}
              {results.length === 1 ? t.matchFound : t.matchesFound}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <ul className='space-y-6'>
                {results.map((result, index) => (
                  <li key={index} className='border-b pb-4 last:border-b-0'>
                    <p className='font-semibold text-lg text-green-700'>
                      {language === 'ar'
                        ? `سورة ${result.surah.name}`
                        : `Surah ${result.surah.number}: ${result.surah.englishName} (${result.surah.name})`}
                    </p>
                    <p className='text-sm text-gray-600 mb-2'>
                      {t.verse} {result.numberInSurah}
                    </p>
                    <p className='mt-2 text-gray-800 leading-relaxed'>
                      {highlightKeyword(result.text)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-center text-gray-600'>{t.noResults}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
