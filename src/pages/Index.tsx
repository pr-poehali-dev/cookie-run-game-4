import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Character = 'silent' | 'dark' | 'gingerbrave' | 'pv' | 'narrator' | 'shadowmilk';

interface DialogLine {
  id: number;
  character: Character;
  name: string;
  text: string;
  image?: string;
}

interface Choice {
  text: string;
  nextScene: number;
}

interface Scene {
  id: number;
  background: string;
  dialogs: DialogLine[];
  choices?: Choice[];
  isEnding?: boolean;
}

const DARK_ENCHANTRESS_IMG = 'https://cdn.poehali.dev/files/a3be490d-28f6-4609-8956-966ea28c5950.png';
const SILENT_SALT_SERIOUS_IMG = 'https://cdn.poehali.dev/files/e55512d6-4a21-4202-b5f6-ec147cadfd3f.png';
const THRONE_HALL_BG = 'https://cdn.poehali.dev/files/b25e6897-fa6c-459a-bd82-d0e84f833b80.jpg';

const STORY_SCENES: Scene[] = [
  {
    id: 0,
    background: 'from-slate-900 via-gray-900 to-black',
    dialogs: [
      { id: 1, character: 'narrator', name: '???', text: 'Beast-Yeast. Тишина. Вечная тишина...', image: DARK_ENCHANTRESS_IMG },
      { id: 2, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 3, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОЙ СМОТРИТЕ КТО ПРОСНУЛСЯ! МОЛЧУН ВЕРНУЛСЯ!', image: DARK_ENCHANTRESS_IMG },
      { id: 4, character: 'silent', name: 'Silent Salt Cookie', text: '... (что вообще происходит?)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (ударить Shadow Milk)', nextScene: 1 },
      { text: '... (промолчать)', nextScene: 2 },
    ],
  },
  {
    id: 1,
    background: 'from-red-900 via-purple-900 to-black',
    dialogs: [
      { id: 5, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОЙ! ОН УДАРИЛ МЕНЯ! ВПЕРВЫЕ ЗА 1000 ЛЕТ!', image: DARK_ENCHANTRESS_IMG },
      { id: 6, character: 'dark', name: 'Dark Enchantress', text: 'Тихий Соль... ты вернулся чтобы всех избить?', image: DARK_ENCHANTRESS_IMG },
      { id: 7, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 8, character: 'gingerbrave', name: 'GingerBrave', text: 'ОН ЖЕ ЛЕГЕНДАРНЫЙ ВОИН! ПОЧЕМУ ОН ТАК АГРЕССИВЕН?!', image: DARK_ENCHANTRESS_IMG },
    ],
    choices: [
      { text: '... (продолжать бить всех)', nextScene: 3 },
      { text: '... (остановиться)', nextScene: 4 },
      { text: '... (уйти нахрен)', nextScene: 5 },
    ],
  },
  {
    id: 2,
    background: 'from-gray-800 via-gray-900 to-black',
    dialogs: [
      { id: 9, character: 'shadowmilk', name: 'Shadow Milk', text: '*болтает 6 часов без остановки*', image: DARK_ENCHANTRESS_IMG },
      { id: 10, character: 'silent', name: 'Silent Salt Cookie', text: '... (это пытка)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 11, character: 'narrator', name: 'Narrator', text: 'Silent Salt Cookie умер от разговоров. КОНЦОВКА: "Молчание - золото"', image: DARK_ENCHANTRESS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 3,
    background: 'from-red-600 via-orange-600 to-black',
    dialogs: [
      { id: 12, character: 'silent', name: 'Silent Salt Cookie', text: '... *достаёт меч*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 13, character: 'shadowmilk', name: 'Shadow Milk', text: 'СТОП СТОП СТОП! Я ЖЕ ШУЧУ!', image: DARK_ENCHANTRESS_IMG },
      { id: 14, character: 'narrator', name: 'Narrator', text: '*эпичная драка* Silent Salt побеждает ВСЕХ одним взмахом меча', image: DARK_ENCHANTRESS_IMG },
      { id: 15, character: 'dark', name: 'Dark Enchantress', text: 'КАК?! ОН МОЛЧА УНИЧТОЖИЛ ВСЕХ!', image: DARK_ENCHANTRESS_IMG },
      { id: 16, character: 'pv', name: 'Pure Vanilla', text: 'Silent Salt... ты слишком силён для этого мира...', image: DARK_ENCHANTRESS_IMG },
      { id: 17, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Молчаливый Разрушитель"', image: DARK_ENCHANTRESS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 4,
    background: 'from-blue-900 via-cyan-900 to-black',
    dialogs: [
      { id: 18, character: 'silent', name: 'Silent Salt Cookie', text: '... (хватит драться)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 19, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОХ! Он ГОВОРИТ! Впервые за ВЕЧНОСТЬ!', image: DARK_ENCHANTRESS_IMG },
      { id: 20, character: 'pv', name: 'Pure Vanilla', text: 'Silent Salt... ты научился словам?', image: DARK_ENCHANTRESS_IMG },
      { id: 21, character: 'narrator', name: 'Narrator', text: 'Silent Salt Cookie стал разговорчивым. Все в ШОКЕ.', image: DARK_ENCHANTRESS_IMG },
      { id: 22, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Больше не Silent"', image: DARK_ENCHANTRESS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 5,
    background: 'from-slate-700 via-gray-800 to-black',
    dialogs: [
      { id: 23, character: 'silent', name: 'Silent Salt Cookie', text: '... *уходит*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 24, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОН ПРОСТО УШЁЛ! БРОСИЛ НАС!', image: DARK_ENCHANTRESS_IMG },
      { id: 25, character: 'dark', name: 'Dark Enchantress', text: 'Silent Salt... такой загадочный...', image: DARK_ENCHANTRESS_IMG },
      { id: 26, character: 'narrator', name: 'Narrator', text: 'Silent Salt Cookie вернулся спать на 1000 лет.', image: DARK_ENCHANTRESS_IMG },
      { id: 27, character: 'pv', name: 'Pure Vanilla', text: 'Он... он просто не хочет с этим разбираться.', image: DARK_ENCHANTRESS_IMG },
      { id: 28, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Вечный Сон"', image: DARK_ENCHANTRESS_IMG },
    ],
    isEnding: true,
  },
];

export default function Index() {
  const [currentScene, setCurrentScene] = useState(0);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [visitedScenes, setVisitedScenes] = useState<number[]>([0]);

  const scene = STORY_SCENES.find((s) => s.id === currentScene) || STORY_SCENES[0];
  const currentDialog = scene.dialogs[currentDialogIndex];
  const isLastDialog = currentDialogIndex === scene.dialogs.length - 1;

  const handleNext = () => {
    if (!isLastDialog) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else if (scene.choices && !scene.isEnding) {
      setShowChoices(true);
    }
  };

  const handleChoice = (nextScene: number) => {
    setCurrentScene(nextScene);
    setCurrentDialogIndex(0);
    setShowChoices(false);
    setVisitedScenes([...visitedScenes, nextScene]);
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setCurrentDialogIndex(0);
    setShowChoices(false);
    setVisitedScenes([0]);
  };

  const characterColors: Record<Character, string> = {
    narrator: 'text-gray-200 bg-gray-800',
    silent: 'text-slate-300 bg-slate-800',
    dark: 'text-purple-300 bg-purple-900',
    shadowmilk: 'text-indigo-400 bg-indigo-900',
    pv: 'text-yellow-300 bg-yellow-800',
    gingerbrave: 'text-orange-600 bg-orange-100',
  };

  return (
    <div className="min-h-screen p-4 transition-all duration-700 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${THRONE_HALL_BG})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${scene.background} opacity-80`} />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6 pt-4">
          <h1 className="text-2xl md:text-3xl mb-2 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] font-bold tracking-wide">
            ЧТО ЗА ПИЗДЕЦ ТУТ ПРОИСХОДИТ
          </h1>
          <Badge className="text-xs px-3 py-1 bg-red-600 text-white border-2 border-red-800">
            Cookie Run: Chaos Edition
          </Badge>
        </div>

        <div className="mb-4 flex justify-center gap-2">
          {STORY_SCENES.map((s) => (
            <div
              key={s.id}
              className={`w-3 h-3 rounded-full transition-all ${
                visitedScenes.includes(s.id) ? 'bg-purple-500 animate-sparkle' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>

        <Card className="border-4 border-purple-600 overflow-hidden animate-fade-in shadow-2xl shadow-purple-500/50">
          <div className="relative bg-black/80 p-4 min-h-[400px] flex items-center justify-center">
            {currentDialog.image && (
              <img
                src={currentDialog.image}
                alt="Character Sprite"
                className="w-full max-w-md h-auto object-contain animate-scale-in drop-shadow-[0_0_50px_rgba(139,92,246,0.8)]"
              />
            )}
          </div>

          <div className="bg-gradient-to-b from-black/95 to-gray-900/95 border-t-4 border-purple-600 p-6">
            <div className="mb-3">
              <Badge className={`${characterColors[currentDialog.character]} border-2 border-current text-sm px-3 py-1 font-semibold`}>
                {currentDialog.name}
              </Badge>
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-4 min-h-[60px] text-white font-normal">
              {currentDialog.text}
            </p>

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">
                {currentDialogIndex + 1} / {scene.dialogs.length}
              </div>
              
              {!showChoices && !scene.isEnding && (
                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-400 shadow-lg shadow-purple-500/50"
                >
                  {isLastDialog && scene.choices ? 'ВЫБРАТЬ' : 'ДАЛЕЕ'}
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              )}

              {!showChoices && scene.isEnding && isLastDialog && (
                <Button
                  onClick={handleRestart}
                  className="bg-red-600 hover:bg-red-700 text-white border-2 border-red-400 animate-pulse"
                >
                  <Icon name="RotateCcw" size={16} className="mr-1" />
                  ЗАНОВО
                </Button>
              )}

              {!showChoices && scene.isEnding && !isLastDialog && (
                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-400"
                >
                  ДАЛЕЕ
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {showChoices && scene.choices && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <p className="text-center text-base font-semibold text-white drop-shadow-lg">ЧТО ДЕЛАТЬ?!</p>
            {scene.choices.map((choice, idx) => (
              <Button
                key={idx}
                onClick={() => handleChoice(choice.nextScene)}
                className="w-full text-sm py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-4 border-purple-400 hover-scale shadow-lg shadow-purple-500/50 font-semibold"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white/20 text-xs"
          >
            <Icon name="Home" size={14} className="mr-1" />
            Сначала
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white/20 text-xs"
          >
            <Icon name="Volume2" size={14} className="mr-1" />
            Звук
          </Button>
        </div>
      </div>
    </div>
  );
}