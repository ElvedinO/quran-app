'use client';

import { useState } from 'react';
import { Search, Info } from 'lucide-react';
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

// All 114 surahs
const surahs = [
  { number: 1, name: 'Al-Fatihah', englishName: 'The Opening' },
  { number: 2, name: 'Al-Baqarah', englishName: 'The Cow' },
  { number: 3, name: 'Aal-i-Imraan', englishName: 'The Family of Imran' },
  { number: 4, name: 'An-Nisa', englishName: 'The Women' },
  { number: 5, name: "Al-Ma'idah", englishName: 'The Table Spread' },
  { number: 6, name: "Al-An'am", englishName: 'The Cattle' },
  { number: 7, name: "Al-A'raf", englishName: 'The Heights' },
  { number: 8, name: 'Al-Anfal', englishName: 'The Spoils of War' },
  { number: 9, name: 'At-Tawbah', englishName: 'The Repentance' },
  { number: 10, name: 'Yunus', englishName: 'Jonah' },
  { number: 11, name: 'Hud', englishName: 'Hud' },
  { number: 12, name: 'Yusuf', englishName: 'Joseph' },
  { number: 13, name: "Ar-Ra'd", englishName: 'The Thunder' },
  { number: 14, name: 'Ibrahim', englishName: 'Abraham' },
  { number: 15, name: 'Al-Hijr', englishName: 'The Rocky Tract' },
  { number: 16, name: 'An-Nahl', englishName: 'The Bee' },
  { number: 17, name: 'Al-Isra', englishName: 'The Night Journey' },
  { number: 18, name: 'Al-Kahf', englishName: 'The Cave' },
  { number: 19, name: 'Maryam', englishName: 'Mary' },
  { number: 20, name: 'Ta-Ha', englishName: 'Ta-Ha' },
  { number: 21, name: 'Al-Anbiya', englishName: 'The Prophets' },
  { number: 22, name: 'Al-Hajj', englishName: 'The Pilgrimage' },
  { number: 23, name: "Al-Mu'minun", englishName: 'The Believers' },
  { number: 24, name: 'An-Nur', englishName: 'The Light' },
  { number: 25, name: 'Al-Furqan', englishName: 'The Criterion' },
  { number: 26, name: "Ash-Shu'ara", englishName: 'The Poets' },
  { number: 27, name: 'An-Naml', englishName: 'The Ant' },
  { number: 28, name: 'Al-Qasas', englishName: 'The Stories' },
  { number: 29, name: 'Al-Ankabut', englishName: 'The Spider' },
  { number: 30, name: 'Ar-Rum', englishName: 'The Romans' },
  { number: 31, name: 'Luqman', englishName: 'Luqman' },
  { number: 32, name: 'As-Sajdah', englishName: 'The Prostration' },
  { number: 33, name: 'Al-Ahzab', englishName: 'The Combined Forces' },
  { number: 34, name: 'Saba', englishName: 'Sheba' },
  { number: 35, name: 'Fatir', englishName: 'Originator' },
  { number: 36, name: 'Ya-Sin', englishName: 'Ya Sin' },
  { number: 37, name: 'As-Saffat', englishName: 'Those Who Set The Ranks' },
  { number: 38, name: 'Sad', englishName: 'The Letter Sad' },
  { number: 39, name: 'Az-Zumar', englishName: 'The Troops' },
  { number: 40, name: 'Ghafir', englishName: 'The Forgiver' },
  { number: 41, name: 'Fussilat', englishName: 'Explained in Detail' },
  { number: 42, name: 'Ash-Shura', englishName: 'The Consultation' },
  { number: 43, name: 'Az-Zukhruf', englishName: 'The Gold Adornments' },
  { number: 44, name: 'Ad-Dukhan', englishName: 'The Smoke' },
  { number: 45, name: 'Al-Jathiyah', englishName: 'The Crouching' },
  { number: 46, name: 'Al-Ahqaf', englishName: 'The Wind-Curved Sandhills' },
  { number: 47, name: 'Muhammad', englishName: 'Muhammad' },
  { number: 48, name: 'Al-Fath', englishName: 'The Victory' },
  { number: 49, name: 'Al-Hujurat', englishName: 'The Rooms' },
  { number: 50, name: 'Qaf', englishName: 'The Letter Qaf' },
  { number: 51, name: 'Adh-Dhariyat', englishName: 'The Winnowing Winds' },
  { number: 52, name: 'At-Tur', englishName: 'The Mount' },
  { number: 53, name: 'An-Najm', englishName: 'The Star' },
  { number: 54, name: 'Al-Qamar', englishName: 'The Moon' },
  { number: 55, name: 'Ar-Rahman', englishName: 'The Beneficent' },
  { number: 56, name: "Al-Waqi'ah", englishName: 'The Inevitable' },
  { number: 57, name: 'Al-Hadid', englishName: 'The Iron' },
  { number: 58, name: 'Al-Mujadila', englishName: 'The Pleading Woman' },
  { number: 59, name: 'Al-Hashr', englishName: 'The Exile' },
  {
    number: 60,
    name: 'Al-Mumtahanah',
    englishName: 'She That Is To Be Examined',
  },
  { number: 61, name: 'As-Saff', englishName: 'The Ranks' },
  { number: 62, name: "Al-Jumu'ah", englishName: 'Friday' },
  { number: 63, name: 'Al-Munafiqun', englishName: 'The Hypocrites' },
  { number: 64, name: 'At-Taghabun', englishName: 'The Mutual Disillusion' },
  { number: 65, name: 'At-Talaq', englishName: 'The Divorce' },
  { number: 66, name: 'At-Tahrim', englishName: 'The Prohibition' },
  { number: 67, name: 'Al-Mulk', englishName: 'The Sovereignty' },
  { number: 68, name: 'Al-Qalam', englishName: 'The Pen' },
  { number: 69, name: 'Al-Haqqah', englishName: 'The Reality' },
  { number: 70, name: "Al-Ma'arij", englishName: 'The Ascending Stairways' },
  { number: 71, name: 'Nuh', englishName: 'Noah' },
  { number: 72, name: 'Al-Jinn', englishName: 'The Jinn' },
  { number: 73, name: 'Al-Muzzammil', englishName: 'The Enshrouded One' },
  { number: 74, name: 'Al-Muddaththir', englishName: 'The Cloaked One' },
  { number: 75, name: 'Al-Qiyamah', englishName: 'The Resurrection' },
  { number: 76, name: 'Al-Insan', englishName: 'The Man' },
  { number: 77, name: 'Al-Mursalat', englishName: 'The Emissaries' },
  { number: 78, name: 'An-Naba', englishName: 'The Tidings' },
  { number: 79, name: "An-Nazi'at", englishName: 'Those Who Drag Forth' },
  { number: 80, name: 'Abasa', englishName: 'He Frowned' },
  { number: 81, name: 'At-Takwir', englishName: 'The Overthrowing' },
  { number: 82, name: 'Al-Infitar', englishName: 'The Cleaving' },
  { number: 83, name: 'Al-Mutaffifin', englishName: 'Defrauding' },
  { number: 84, name: 'Al-Inshiqaq', englishName: 'The Splitting Open' },
  { number: 85, name: 'Al-Buruj', englishName: 'The Mansions of the Stars' },
  { number: 86, name: 'At-Tariq', englishName: 'The Morning Star' },
  { number: 87, name: "Al-A'la", englishName: 'The Most High' },
  { number: 88, name: 'Al-Ghashiyah', englishName: 'The Overwhelming' },
  { number: 89, name: 'Al-Fajr', englishName: 'The Dawn' },
  { number: 90, name: 'Al-Balad', englishName: 'The City' },
  { number: 91, name: 'Ash-Shams', englishName: 'The Sun' },
  { number: 92, name: 'Al-Lail', englishName: 'The Night' },
  { number: 93, name: 'Ad-Duha', englishName: 'The Morning Hours' },
  { number: 94, name: 'Ash-Sharh', englishName: 'The Relief' },
  { number: 95, name: 'At-Tin', englishName: 'The Fig' },
  { number: 96, name: 'Al-Alaq', englishName: 'The Clot' },
  { number: 97, name: 'Al-Qadr', englishName: 'The Power' },
  { number: 98, name: 'Al-Bayyinah', englishName: 'The Clear Proof' },
  { number: 99, name: 'Az-Zalzalah', englishName: 'The Earthquake' },
  { number: 100, name: 'Al-Adiyat', englishName: 'The Courser' },
  { number: 101, name: "Al-Qari'ah", englishName: 'The Calamity' },
  {
    number: 102,
    name: 'At-Takathur',
    englishName: 'The Rivalry in World Increase',
  },
  { number: 103, name: 'Al-Asr', englishName: 'The Declining Day' },
  { number: 104, name: 'Al-Humazah', englishName: 'The Traducer' },
  { number: 105, name: 'Al-Fil', englishName: 'The Elephant' },
  { number: 106, name: 'Quraish', englishName: 'Quraysh' },
  { number: 107, name: "Al-Ma'un", englishName: 'The Small Kindnesses' },
  { number: 108, name: 'Al-Kawthar', englishName: 'The Abundance' },
  { number: 109, name: 'Al-Kafirun', englishName: 'The Disbelievers' },
  { number: 110, name: 'An-Nasr', englishName: 'The Divine Support' },
  { number: 111, name: 'Al-Masad', englishName: 'The Palm Fiber' },
  { number: 112, name: 'Al-Ikhlas', englishName: 'The Sincerity' },
  { number: 113, name: 'Al-Falaq', englishName: 'The Daybreak' },
  { number: 114, name: 'An-Nas', englishName: 'Mankind' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ur', name: 'Urdu' },
  { code: 'id', name: 'Indonesian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'ru', name: 'Russian' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'bg', name: 'Bulgarian' },
];

export default function QuranSearch() {
  const [keyword, setKeyword] = useState('');
  const [surah, setSurah] = useState('all');
  const [language, setLanguage] = useState('en');
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className='container mx-auto p-4 max-w-4xl'>
      <Card className='w-full'>
        <CardHeader className='bg-gradient-to-r from-green-500 to-green-600 text-white'>
          <CardTitle className='text-3xl font-bold'>Quran Search</CardTitle>
          <CardDescription className='text-green-100'>
            Explore the wisdom of the Quran
          </CardDescription>
        </CardHeader>
        <CardContent className='mt-6'>
          <Alert className='mb-6'>
            <Info className='h-4 w-4' />
            <AlertTitle>How to use</AlertTitle>
            <AlertDescription>
              1. Enter a keyword to search for in the Quran 2. Optionally,
              select a specific Surah to search within 3. Choose your preferred
              language for the search results 4. Click the Search button to find
              matching verses
            </AlertDescription>
          </Alert>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Input
                placeholder='Enter keyword to search'
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
                    <p>
                      Enter any word or phrase you want to find in the Quran
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='flex space-x-4'>
              <div className='w-1/2'>
                <Select value={surah} onValueChange={setSurah}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Surah' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Surahs</SelectItem>
                    {surahs.map((surah) => (
                      <SelectItem
                        key={surah.number}
                        value={surah.number.toString()}
                      >
                        Surah {surah.number} - {surah.name} ({surah.englishName}
                        )
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='w-1/2'>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Language' />
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
                <span className='mr-2'>Searching...</span>
                <span className='animate-spin'>⏳</span>
              </>
            ) : (
              <>
                <Search className='mr-2 h-4 w-4' /> Search Quran
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      {results !== null && (
        <Card className='w-full mt-6'>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {results.length} {results.length === 1 ? 'match' : 'matches'}{' '}
              found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <ul className='space-y-6'>
                {results.map((result, index) => (
                  <li key={index} className='border-b pb-4 last:border-b-0'>
                    <p className='font-semibold text-lg text-green-700'>
                      Surah {result.surah.number}: {result.surah.englishName} (
                      {result.surah.name})
                    </p>
                    <p className='text-sm text-gray-600 mb-2'>
                      Verse {result.numberInSurah}
                    </p>
                    <p className='mt-2 text-gray-800 leading-relaxed'>
                      {highlightKeyword(result.text)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-center text-gray-600'>
                No results found. Try a different keyword or broaden your
                search.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
