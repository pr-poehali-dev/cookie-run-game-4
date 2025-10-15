import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Cookie {
  id: number;
  name: string;
  rarity: Rarity;
  power: number;
  emoji: string;
  obtained: boolean;
}

const COOKIES: Cookie[] = [
  { id: 1, name: 'Strawberry Cookie', rarity: 'common', power: 120, emoji: '🍓', obtained: false },
  { id: 2, name: 'Wizard Cookie', rarity: 'rare', power: 250, emoji: '🧙', obtained: false },
  { id: 3, name: 'Knight Cookie', rarity: 'rare', power: 280, emoji: '⚔️', obtained: false },
  { id: 4, name: 'Princess Cookie', rarity: 'epic', power: 450, emoji: '👑', obtained: false },
  { id: 5, name: 'Dragon Cookie', rarity: 'legendary', power: 850, emoji: '🐉', obtained: false },
  { id: 6, name: 'Ninja Cookie', rarity: 'epic', power: 420, emoji: '🥷', obtained: false },
  { id: 7, name: 'Angel Cookie', rarity: 'rare', power: 310, emoji: '👼', obtained: false },
  { id: 8, name: 'Pirate Cookie', rarity: 'common', power: 150, emoji: '🏴‍☠️', obtained: false },
  { id: 9, name: 'Mage Cookie', rarity: 'legendary', power: 920, emoji: '✨', obtained: false },
  { id: 10, name: 'Demon Cookie', rarity: 'epic', power: 480, emoji: '😈', obtained: false },
];

const rarityColors: Record<Rarity, string> = {
  common: 'bg-gray-400',
  rare: 'bg-blue-500',
  epic: 'bg-purple-600',
  legendary: 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600',
};

const rarityBorders: Record<Rarity, string> = {
  common: 'border-gray-500',
  rare: 'border-blue-600',
  epic: 'border-purple-700',
  legendary: 'border-yellow-500',
};

export default function Index() {
  const [currentTab, setCurrentTab] = useState<'game' | 'shop' | 'collection' | 'settings'>('game');
  const [cookies, setCookies] = useState<Cookie[]>(COOKIES);
  const [coins, setCoins] = useState(1000);
  const [isRolling, setIsRolling] = useState(false);
  const [lastPulled, setLastPulled] = useState<Cookie | null>(null);

  const handleGacha = () => {
    if (coins < 100) {
      toast.error('Not enough coins!');
      return;
    }

    setIsRolling(true);
    setCoins(coins - 100);

    setTimeout(() => {
      const random = Math.random();
      let selectedRarity: Rarity;

      if (random < 0.5) selectedRarity = 'common';
      else if (random < 0.8) selectedRarity = 'rare';
      else if (random < 0.95) selectedRarity = 'epic';
      else selectedRarity = 'legendary';

      const availableCookies = cookies.filter((c) => c.rarity === selectedRarity);
      const pulledCookie = availableCookies[Math.floor(Math.random() * availableCookies.length)];

      setCookies(
        cookies.map((c) => (c.id === pulledCookie.id ? { ...c, obtained: true } : c))
      );
      setLastPulled(pulledCookie);
      setIsRolling(false);

      toast.success(`You got ${pulledCookie.name}!`, {
        description: `${pulledCookie.rarity.toUpperCase()} - Power: ${pulledCookie.power}`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-green-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-4xl md:text-5xl mb-4 text-pink-600 drop-shadow-lg pixel-outline">
            COOKIE KINGDOM
          </h1>
          <div className="flex justify-center gap-4 items-center">
            <Badge className="text-lg px-4 py-2 bg-yellow-400 text-yellow-900 border-2 border-yellow-600">
              💰 {coins}
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <Button
            onClick={() => setCurrentTab('game')}
            variant={currentTab === 'game' ? 'default' : 'outline'}
            className="text-xs md:text-sm px-3 py-2 border-2 border-black"
          >
            <Icon name="Gamepad2" size={16} className="mr-2" />
            GAME
          </Button>
          <Button
            onClick={() => setCurrentTab('shop')}
            variant={currentTab === 'shop' ? 'default' : 'outline'}
            className="text-xs md:text-sm px-3 py-2 border-2 border-black"
          >
            <Icon name="ShoppingBag" size={16} className="mr-2" />
            SHOP
          </Button>
          <Button
            onClick={() => setCurrentTab('collection')}
            variant={currentTab === 'collection' ? 'default' : 'outline'}
            className="text-xs md:text-sm px-3 py-2 border-2 border-black"
          >
            <Icon name="BookOpen" size={16} className="mr-2" />
            COLLECTION
          </Button>
          <Button
            onClick={() => setCurrentTab('settings')}
            variant={currentTab === 'settings' ? 'default' : 'outline'}
            className="text-xs md:text-sm px-3 py-2 border-2 border-black"
          >
            <Icon name="Settings" size={16} className="mr-2" />
            SETTINGS
          </Button>
        </div>

        {/* Game Tab - Gacha System */}
        {currentTab === 'game' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-pink-300 to-pink-400 border-4 border-pink-600">
              <h2 className="text-2xl mb-6 text-center text-white drop-shadow-md">
                🎁 COOKIE GACHA
              </h2>
              <div className="flex flex-col items-center gap-6">
                {lastPulled && !isRolling && (
                  <Card
                    className={`p-6 w-64 ${rarityBorders[lastPulled.rarity]} border-4 animate-scale-in`}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">{lastPulled.emoji}</div>
                      <h3 className="text-lg mb-2">{lastPulled.name}</h3>
                      <Badge className={`${rarityColors[lastPulled.rarity]} text-white mb-2`}>
                        {lastPulled.rarity.toUpperCase()}
                      </Badge>
                      <p className="text-sm">⚡ Power: {lastPulled.power}</p>
                    </div>
                  </Card>
                )}
                {isRolling && (
                  <div className="text-6xl animate-bounce">🎲</div>
                )}
                <Button
                  onClick={handleGacha}
                  disabled={isRolling || coins < 100}
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-4 border-pink-800 text-white"
                >
                  {isRolling ? 'ROLLING...' : 'PULL (100 💰)'}
                </Button>
                <p className="text-xs text-center opacity-75">
                  50% Common • 30% Rare • 15% Epic • 5% Legendary
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Shop Tab */}
        {currentTab === 'shop' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-yellow-300 to-orange-300 border-4 border-yellow-600">
              <h2 className="text-2xl mb-6 text-center text-yellow-900">
                🏪 COOKIE SHOP
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 border-2 border-yellow-700 hover-scale cursor-pointer">
                  <h3 className="text-lg mb-2">💎 100 Coins</h3>
                  <p className="text-sm mb-2">$0.99</p>
                  <Button className="w-full text-xs border-2 border-black">BUY</Button>
                </Card>
                <Card className="p-4 border-2 border-yellow-700 hover-scale cursor-pointer">
                  <h3 className="text-lg mb-2">💎 500 Coins</h3>
                  <p className="text-sm mb-2">$3.99</p>
                  <Button className="w-full text-xs border-2 border-black">BUY</Button>
                </Card>
              </div>
            </Card>
          </div>
        )}

        {/* Collection Tab */}
        {currentTab === 'collection' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-purple-300 to-blue-300 border-4 border-purple-600">
              <h2 className="text-2xl mb-6 text-center text-purple-900">
                📖 COOKIE COLLECTION
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cookies.map((cookie) => (
                  <Card
                    key={cookie.id}
                    className={`p-4 border-4 ${rarityBorders[cookie.rarity]} ${
                      !cookie.obtained ? 'opacity-50 grayscale' : 'hover-scale'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{cookie.obtained ? cookie.emoji : '❓'}</div>
                      <p className="text-xs mb-1">{cookie.obtained ? cookie.name : '???'}</p>
                      {cookie.obtained && (
                        <>
                          <Badge className={`${rarityColors[cookie.rarity]} text-white text-xs mb-1`}>
                            {cookie.rarity[0].toUpperCase()}
                          </Badge>
                          <p className="text-xs">⚡{cookie.power}</p>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm">
                  Collected: {cookies.filter((c) => c.obtained).length} / {cookies.length}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {currentTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-gray-300 to-gray-400 border-4 border-gray-600">
              <h2 className="text-2xl mb-6 text-center text-gray-900">
                ⚙️ SETTINGS
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Music</span>
                  <Button variant="outline" size="sm" className="text-xs border-2 border-black">
                    ON
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sound FX</span>
                  <Button variant="outline" size="sm" className="text-xs border-2 border-black">
                    ON
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Notifications</span>
                  <Button variant="outline" size="sm" className="text-xs border-2 border-black">
                    ON
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
