import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Character = 'gingerbrave' | 'dark' | 'wizard' | 'custard' | 'narrator' | 'espresso';

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

const STORY_SCENES: Scene[] = [
  {
    id: 0,
    background: 'from-purple-900 via-black to-gray-900',
    dialogs: [
      { id: 1, character: 'narrator', name: '???', text: 'Cookie Kingdom. 3 часа ночи. Что-то пошло не так...', image: DARK_ENCHANTRESS_IMG },
      { id: 2, character: 'gingerbrave', name: 'GingerBrave', text: 'РЕБЯТ, ВЫ ТОЛЬКО ПОСМОТРИТЕ НА ЭТО ДЕРЬМО!', image: DARK_ENCHANTRESS_IMG },
      { id: 3, character: 'wizard', name: 'Wizard Cookie', text: 'Джинджер, я умоляю, у меня экзамен по тёмной магии завтра...', image: DARK_ENCHANTRESS_IMG },
      { id: 4, character: 'gingerbrave', name: 'GingerBrave', text: 'Dark Enchantress Cookie ТАНЦУЕТ ФОРТНАЙТ ДЭНСЫ В ЦЕНТРЕ ГОРОДА!', image: DARK_ENCHANTRESS_IMG },
    ],
    choices: [
      { text: 'Пойти посмотреть на этот цирк', nextScene: 1 },
      { text: 'Игнорировать и спать дальше', nextScene: 2 },
    ],
  },
  {
    id: 1,
    background: 'from-pink-500 via-purple-600 to-black',
    dialogs: [
      { id: 5, character: 'dark', name: 'Dark Enchantress', text: '*делает orange justice* ЭТО МОЁ КОРОЛЕВСТВО ТЕПЕРЬ, ЛОХИ!', image: DARK_ENCHANTRESS_IMG },
      { id: 6, character: 'custard', name: 'Custard Cookie III', text: 'Я... я король... зачем она это делает... папа...', image: DARK_ENCHANTRESS_IMG },
      { id: 7, character: 'espresso', name: 'Espresso Cookie', text: 'Мне за это не платят достаточно.', image: DARK_ENCHANTRESS_IMG },
      { id: 8, character: 'gingerbrave', name: 'GingerBrave', text: 'Окей, у меня есть план. Он тупой, но это план.', image: DARK_ENCHANTRESS_IMG },
    ],
    choices: [
      { text: 'ВЫЗВАТЬ ЕЁ НА ДАНС-БАТТЛ', nextScene: 3 },
      { text: 'Просто стоять и смотреть', nextScene: 4 },
      { text: 'Позвонить в полицию печенек', nextScene: 5 },
    ],
  },
  {
    id: 2,
    background: 'from-orange-300 via-red-400 to-black',
    dialogs: [
      { id: 9, character: 'narrator', name: 'Narrator', text: 'Ты проснулся. Королевство в огне. Dark Enchantress забрала все Fortnite скины.', image: DARK_ENCHANTRESS_IMG },
      { id: 10, character: 'gingerbrave', name: 'GingerBrave', text: 'НЕТ! МОЙ СКИН ДЖОНА УИКА!', image: DARK_ENCHANTRESS_IMG },
      { id: 11, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Никогда не игнорируй Fortnite данс в 3 ночи"', image: DARK_ENCHANTRESS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 3,
    background: 'from-yellow-400 via-pink-500 to-purple-600',
    dialogs: [
      { id: 12, character: 'gingerbrave', name: 'GingerBrave', text: 'DANCE BATTLE! WINNER TAKES ALL!', image: DARK_ENCHANTRESS_IMG },
      { id: 13, character: 'dark', name: 'Dark Enchantress', text: 'ТЫ СЕРЬЁЗНО? *смеётся* Ладно, попробуй!', image: DARK_ENCHANTRESS_IMG },
      { id: 14, character: 'narrator', name: 'Narrator', text: '*эпичная музыка* GingerBrave делает impossible move!', image: DARK_ENCHANTRESS_IMG },
      { id: 15, character: 'dark', name: 'Dark Enchantress', text: 'ЧТО... КАК... ЭТО ФИЗИЧЕСКИ НЕВОЗМОЖНО!', image: DARK_ENCHANTRESS_IMG },
      { id: 16, character: 'wizard', name: 'Wizard Cookie', text: 'Он... он победил тёмную магию... танцем...', image: DARK_ENCHANTRESS_IMG },
      { id: 17, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Dance Dance Revolution"', image: DARK_ENCHANTRESS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 4,
    background: 'from-gray-600 via-gray-700 to-black',
    dialogs: [
      { id: 18, character: 'dark', name: 'Dark Enchantress', text: '*продолжает танцевать 6 часов подряд*', image: DARK_ENCHANTRESS_IMG },
      { id: 19, character: 'espresso', name: 'Espresso Cookie', text: 'Она... она просто не останавливается...', image: DARK_ENCHANTRESS_IMG },
      { id: 20, character: 'custard', name: 'Custard Cookie III', text: 'Это наша жизнь теперь...', image: DARK_ENCHANTRESS_IMG },
      { id: 21, character: 'narrator', name: 'Narrator', text: 'Спустя месяц все научились танцевать. Королевство стало диско-клубом.', image: DARK_ENCHANTRESS_IMG },
      { id: 22, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Eternal Disco"', image: DARK_ENCHANTRESS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 5,
    background: 'from-blue-500 via-blue-700 to-black',
    dialogs: [
      { id: 23, character: 'gingerbrave', name: 'GingerBrave', text: '*звонит 911*', image: DARK_ENCHANTRESS_IMG },
      { id: 24, character: 'narrator', name: 'Operator', text: 'Служба спасения печенек, что случилось?', image: DARK_ENCHANTRESS_IMG },
      { id: 25, character: 'gingerbrave', name: 'GingerBrave', text: 'Dark Enchantress танцует фортнайт дэнсы на площади!', image: DARK_ENCHANTRESS_IMG },
      { id: 26, character: 'narrator', name: 'Operator', text: '*кладёт трубку*', image: DARK_ENCHANTRESS_IMG },
      { id: 27, character: 'espresso', name: 'Espresso Cookie', text: 'Даже полиция не хочет с этим разбираться.', image: DARK_ENCHANTRESS_IMG },
      { id: 28, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "911 не работает"', image: DARK_ENCHANTRESS_IMG },
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
    gingerbrave: 'text-orange-600 bg-orange-100',
    dark: 'text-purple-300 bg-purple-900',
    wizard: 'text-blue-600 bg-blue-100',
    custard: 'text-yellow-600 bg-yellow-100',
    espresso: 'text-amber-700 bg-amber-100',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${scene.background} p-4 transition-all duration-700`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 pt-4">
          <h1 className="text-3xl md:text-5xl mb-2 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-pulse">
            ЧТО ЗА ПИЗДЕЦ ТУТ ПРОИСХОДИТ
          </h1>
          <Badge className="text-sm px-3 py-1 bg-red-600 text-white border-2 border-red-800 animate-bounce">
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
              <Badge className={`${characterColors[currentDialog.character]} border-2 border-current text-base px-3 py-1 font-bold`}>
                {currentDialog.name}
              </Badge>
            </div>
            <p className="text-base md:text-lg leading-relaxed mb-4 min-h-[80px] text-white font-semibold">
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
            <p className="text-center text-lg font-bold text-white drop-shadow-lg">ЧТО ДЕЛАТЬ?!</p>
            {scene.choices.map((choice, idx) => (
              <Button
                key={idx}
                onClick={() => handleChoice(choice.nextScene)}
                className="w-full text-base py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-4 border-purple-400 hover-scale shadow-lg shadow-purple-500/50 font-bold"
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