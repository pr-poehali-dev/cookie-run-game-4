import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Character = 'strawberry' | 'wizard' | 'knight' | 'princess' | 'narrator';

interface DialogLine {
  id: number;
  character: Character;
  name: string;
  text: string;
  emoji: string;
}

interface Choice {
  text: string;
  nextScene: number;
  effect?: string;
}

interface Scene {
  id: number;
  background: string;
  dialogs: DialogLine[];
  choices?: Choice[];
  isEnding?: boolean;
}

const STORY_SCENES: Scene[] = [
  {
    id: 0,
    background: 'from-pink-200 via-yellow-100 to-orange-200',
    dialogs: [
      { id: 1, character: 'narrator', name: 'Narrator', text: 'Welcome to Cookie Kingdom, a magical land where cookies live in harmony...', emoji: '📖' },
      { id: 2, character: 'narrator', name: 'Narrator', text: 'Until one day, the Dark Chocolate Dragon threatened the kingdom!', emoji: '📖' },
      { id: 3, character: 'strawberry', name: 'Strawberry Cookie', text: 'Oh no! The kingdom is in danger! We need to do something!', emoji: '🍓' },
    ],
    choices: [
      { text: 'Gather the heroes', nextScene: 1, effect: 'brave' },
      { text: 'Run and hide', nextScene: 2, effect: 'coward' },
    ],
  },
  {
    id: 1,
    background: 'from-blue-200 via-purple-200 to-pink-200',
    dialogs: [
      { id: 4, character: 'strawberry', name: 'Strawberry Cookie', text: "We need to find the bravest cookies in the kingdom!", emoji: '🍓' },
      { id: 5, character: 'wizard', name: 'Wizard Cookie', text: 'I heard that noise! Count me in! My magic will protect us!', emoji: '🧙' },
      { id: 6, character: 'knight', name: 'Knight Cookie', text: 'A knight never abandons their kingdom! I shall join you!', emoji: '⚔️' },
    ],
    choices: [
      { text: 'Head to the castle', nextScene: 3, effect: 'castle' },
      { text: 'Explore the forest', nextScene: 4, effect: 'forest' },
    ],
  },
  {
    id: 2,
    background: 'from-gray-300 via-gray-400 to-gray-500',
    dialogs: [
      { id: 7, character: 'strawberry', name: 'Strawberry Cookie', text: 'Maybe hiding is safer...', emoji: '🍓' },
      { id: 8, character: 'narrator', name: 'Narrator', text: 'But the Dragon found the hiding spot and destroyed everything...', emoji: '📖' },
      { id: 9, character: 'narrator', name: 'Narrator', text: 'THE END - Bad Ending: Cowardice leads to ruin', emoji: '💀' },
    ],
    isEnding: true,
  },
  {
    id: 3,
    background: 'from-yellow-200 via-orange-200 to-red-200',
    dialogs: [
      { id: 10, character: 'princess', name: 'Princess Cookie', text: 'Heroes! Thank goodness you came! The Dragon is approaching!', emoji: '👑' },
      { id: 11, character: 'wizard', name: 'Wizard Cookie', text: 'Princess, we need the legendary Cookie Sword!', emoji: '🧙' },
      { id: 12, character: 'princess', name: 'Princess Cookie', text: 'Take it, brave ones. Save our kingdom!', emoji: '👑' },
      { id: 13, character: 'knight', name: 'Knight Cookie', text: 'For the kingdom! Let us face the Dragon!', emoji: '⚔️' },
      { id: 14, character: 'narrator', name: 'Narrator', text: 'With courage and teamwork, the heroes defeated the Dragon!', emoji: '📖' },
      { id: 15, character: 'narrator', name: 'Narrator', text: 'THE END - Good Ending: United We Stand!', emoji: '🎉' },
    ],
    isEnding: true,
  },
  {
    id: 4,
    background: 'from-green-200 via-emerald-200 to-teal-200',
    dialogs: [
      { id: 16, character: 'wizard', name: 'Wizard Cookie', text: 'Look! In the forest! Ancient runes of power!', emoji: '🧙' },
      { id: 17, character: 'knight', name: 'Knight Cookie', text: 'These runes... they grant us incredible strength!', emoji: '⚔️' },
      { id: 18, character: 'strawberry', name: 'Strawberry Cookie', text: 'With this power, we can protect everyone!', emoji: '🍓' },
      { id: 19, character: 'narrator', name: 'Narrator', text: 'The heroes used the ancient magic to seal the Dragon forever!', emoji: '📖' },
      { id: 20, character: 'narrator', name: 'Narrator', text: 'THE END - Secret Ending: Power of the Ancients!', emoji: '✨' },
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
    narrator: 'text-gray-700',
    strawberry: 'text-pink-600',
    wizard: 'text-purple-600',
    knight: 'text-blue-600',
    princess: 'text-yellow-600',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${scene.background} p-4 transition-all duration-500`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 pt-4">
          <h1 className="text-3xl md:text-4xl mb-2 text-pink-600 drop-shadow-lg">
            🍪 COOKIE KINGDOM 🍪
          </h1>
          <Badge className="text-sm px-3 py-1 bg-purple-500 text-white border-2 border-purple-700">
            Visual Novel
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-4 flex justify-center gap-2">
          {STORY_SCENES.map((s) => (
            <div
              key={s.id}
              className={`w-3 h-3 rounded-full ${
                visitedScenes.includes(s.id) ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Main Visual Novel Screen */}
        <Card className="border-4 border-black overflow-hidden animate-fade-in">
          {/* Character Portrait */}
          <div className="bg-gradient-to-b from-black/20 to-transparent p-8 min-h-[300px] flex items-center justify-center">
            <div className="text-9xl animate-scale-in">
              {currentDialog.emoji}
            </div>
          </div>

          {/* Dialog Box */}
          <div className="bg-white/95 border-t-4 border-black p-6">
            <div className="mb-3">
              <Badge className={`${characterColors[currentDialog.character]} bg-white border-2 border-current text-base px-3 py-1`}>
                {currentDialog.name}
              </Badge>
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-4 min-h-[60px]">
              {currentDialog.text}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {currentDialogIndex + 1} / {scene.dialogs.length}
              </div>
              
              {!showChoices && !scene.isEnding && (
                <Button
                  onClick={handleNext}
                  className="bg-pink-500 hover:bg-pink-600 text-white border-2 border-pink-700"
                >
                  {isLastDialog && scene.choices ? 'Choose' : 'Next'}
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              )}

              {!showChoices && scene.isEnding && isLastDialog && (
                <Button
                  onClick={handleRestart}
                  className="bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-700"
                >
                  <Icon name="RotateCcw" size={16} className="mr-1" />
                  Restart
                </Button>
              )}

              {!showChoices && scene.isEnding && !isLastDialog && (
                <Button
                  onClick={handleNext}
                  className="bg-pink-500 hover:bg-pink-600 text-white border-2 border-pink-700"
                >
                  Next
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Choices */}
        {showChoices && scene.choices && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <p className="text-center text-sm font-semibold">What will you do?</p>
            {scene.choices.map((choice, idx) => (
              <Button
                key={idx}
                onClick={() => handleChoice(choice.nextScene)}
                className="w-full text-base py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-4 border-blue-800 hover-scale"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="sm"
            className="border-2 border-black text-xs"
          >
            <Icon name="Home" size={14} className="mr-1" />
            Start Over
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-black text-xs"
          >
            <Icon name="Save" size={14} className="mr-1" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-black text-xs"
          >
            <Icon name="Settings" size={14} className="mr-1" />
            Options
          </Button>
        </div>
      </div>
    </div>
  );
}
