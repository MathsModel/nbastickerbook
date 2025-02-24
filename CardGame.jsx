import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, User, BookOpen, Users, Image, Lock } from 'lucide-react';

const NBA_PLAYERS = [
  { id: 1, name: "LeBron James", team: "Lakers", rating: 96 },
  { id: 2, name: "Giannis Antetokounmpo", team: "Bucks", rating: 96 },
  { id: 3, name: "Joel Embiid", team: "76ers", rating: 95 },
  { id: 4, name: "Kevin Durant", team: "Suns", rating: 94 },
  { id: 5, name: "Stephen Curry", team: "Warriors", rating: 93 },
  { id: 6, name: "Nikola Jokic", team: "Nuggets", rating: 96 },
  { id: 7, name: "Luka Doncic", team: "Mavericks", rating: 94 },
  { id: 8, name: "Jayson Tatum", team: "Celtics", rating: 92 },
  { id: 9, name: "Damian Lillard", team: "Bucks", rating: 89 },
  { id: 10, name: "Donovan Mitchell", team: "Cavaliers", rating: 88 },
  { id: 11, name: "Anthony Edwards", team: "Timberwolves", rating: 87 },
  { id: 12, name: "Tyrese Haliburton", team: "Pacers", rating: 86 },
  { id: 13, name: "Trae Young", team: "Hawks", rating: 85 },
  { id: 14, name: "Jalen Brunson", team: "Knicks", rating: 84 },
  { id: 15, name: "Domantas Sabonis", team: "Kings", rating: 83 },
  { id: 16, name: "DeMar DeRozan", team: "Bulls", rating: 82 },
  { id: 17, name: "Pascal Siakam", team: "Pacers", rating: 81 },
  { id: 18, name: "Franz Wagner", team: "Magic", rating: 80 },
  { id: 19, name: "Tyler Herro", team: "Heat", rating: 79 },
  { id: 20, name: "Jordan Poole", team: "Wizards", rating: 78 },
  { id: 21, name: "RJ Barrett", team: "Knicks", rating: 77 },
  { id: 22, name: "Buddy Hield", team: "76ers", rating: 76 },
  { id: 23, name: "Kyle Kuzma", team: "Wizards", rating: 75 },
  { id: 24, name: "Pat Connaughton", team: "Bucks", rating: 74 },
  { id: 25, name: "Josh Green", team: "Mavericks", rating: 73 },
  { id: 26, name: "Malik Monk", team: "Kings", rating: 72 },
  { id: 27, name: "Lonnie Walker IV", team: "Nets", rating: 71 },
  { id: 28, name: "Cam Reddish", team: "Lakers", rating: 70 }
];

const NBA_COACHES = [
  { id: 101, name: "Erik Spoelstra", team: "Heat", rating: 74 },
  { id: 102, name: "Steve Kerr", team: "Warriors", rating: 74 },
  { id: 103, name: "Doc Rivers", team: "Bucks", rating: 74 },
  { id: 104, name: "Monty Williams", team: "Pistons", rating: 74 },
  { id: 105, name: "Joe Mazzulla", team: "Celtics", rating: 74 }
];

const NBA_LOGOS = [
  { id: 201, name: "Lakers Logo", team: "Lakers", rating: 74 },
  { id: 202, name: "Celtics Logo", team: "Celtics", rating: 74 },
  { id: 203, name: "Warriors Logo", team: "Warriors", rating: 74 },
  { id: 204, name: "Bulls Logo", team: "Bulls", rating: 74 },
  { id: 205, name: "Heat Logo", team: "Heat", rating: 74 }
];

const getRarity = (rating) => {
  if (rating >= 90) return 'legendary';
  if (rating >= 85) return 'mythic';
  if (rating >= 80) return 'epic';
  if (rating >= 75) return 'rare';
  return 'common';
};

const RARITY_COLORS = {
  legendary: 'bg-yellow-500',
  mythic: 'bg-red-500',
  epic: 'bg-purple-500',
  rare: 'bg-blue-500',
  common: 'bg-gray-500'
};

const PlayerCard = ({ item, isRevealed, type = 'player' }) => {
  const rarity = getRarity(item.rating);
  const bgColor = RARITY_COLORS[rarity];
  
  const getIcon = () => {
    switch (type) {
      case 'coach':
        return <Users size={48} className="mb-4" />;
      case 'logo':
        return <Image size={48} className="mb-4" />;
      default:
        return <User size={48} className="mb-4" />;
    }
  };
  
  return (
    <Card className={`w-48 h-64 m-2 transform transition-all duration-500 ${isRevealed ? 'rotate-0' : 'rotate-180'}`}>
      <CardContent className={`h-full p-4 flex flex-col items-center justify-center text-white ${bgColor}`}>
        {isRevealed && (
          <>
            {getIcon()}
            <h3 className="text-lg font-bold text-center mb-2">{item.name}</h3>
            <p className="text-sm mb-1">{item.team}</p>
            <p className="text-xl font-bold">Rating: {item.rating}</p>
            <p className="text-xs mt-2 capitalize">{rarity}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const CardGame = () => {
  const [packsOpened, setPacksOpened] = useState(0);
  const [currentPack, setCurrentPack] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showCollection, setShowCollection] = useState(false);

  const openPack = () => {
    const newPack = [];
    const minRating = Math.random() < 0.1 ? 90 : 
                     Math.random() < 0.2 ? 85 : 
                     Math.random() < 0.3 ? 80 : 
                     75;
    
    const guaranteedPool = NBA_PLAYERS.filter(p => p.rating >= minRating);
    newPack.push({ item: guaranteedPool[Math.floor(Math.random() * guaranteedPool.length)], type: 'player' });
    
    while (newPack.length < 5) {
      const cardType = Math.random();
      let item;
      let type;

      if (cardType < 0.7) {
        // 70% chance for player
        const ratingThreshold = Math.random();
        let pool;
        if (ratingThreshold < 0.05) pool = NBA_PLAYERS.filter(p => p.rating >= 90);
        else if (ratingThreshold < 0.15) pool = NBA_PLAYERS.filter(p => p.rating >= 85);
        else if (ratingThreshold < 0.30) pool = NBA_PLAYERS.filter(p => p.rating >= 80);
        else if (ratingThreshold < 0.50) pool = NBA_PLAYERS.filter(p => p.rating >= 75);
        else pool = NBA_PLAYERS.filter(p => p.rating < 75);
        
        item = pool[Math.floor(Math.random() * pool.length)];
        type = 'player';
      } else if (cardType < 0.85) {
        // 15% chance for coach
        item = NBA_COACHES[Math.floor(Math.random() * NBA_COACHES.length)];
        type = 'coach';
      } else {
        // 15% chance for logo
        item = NBA_LOGOS[Math.floor(Math.random() * NBA_LOGOS.length)];
        type = 'logo';
      }
      
      if (!newPack.find(card => card.item.id === item.id)) {
        newPack.push({ item, type });
      }
    }
    
    setCurrentPack(newPack);
    setCollection([...collection, ...newPack]);
    setPacksOpened(packsOpened + 1);
    setIsRevealing(true);
    setTimeout(() => setIsRevealing(false), 1000);
  };

  const CollectionView = () => {
    // Get all unique teams from all card types
    const allTeams = [...new Set([
      ...NBA_PLAYERS.map(p => p.team),
      ...NBA_COACHES.map(c => c.team),
      ...NBA_LOGOS.map(l => l.team)
    ])].sort();

    // Create a map of collected cards
    const collectedCards = collection.reduce((acc, card) => {
      const key = `${card.type}-${card.item.id}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        {allTeams.map(team => {
          // Get all possible cards for this team
          const teamPlayers = NBA_PLAYERS.filter(p => p.team === team);
          const teamCoaches = NBA_COACHES.filter(c => c.team === team);
          const teamLogos = NBA_LOGOS.filter(l => l.team === team);
          const totalPossibleCards = teamPlayers.length + teamCoaches.length + teamLogos.length;

          // Count collected cards for this team
          const collectedCount = collection.filter(card => card.item.team === team).length;

          return (
            <div key={team} className="border rounded-lg p-4">
              <h3 className="text-xl font-bold mb-3 flex justify-between">
                <span>{team}</span>
                <span className="text-sm text-gray-500">
                  Collected: {collectedCount} / {totalPossibleCards}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {[
                  ...teamPlayers.map(card => ({ card, type: 'player' })),
                  ...teamCoaches.map(card => ({ card, type: 'coach' })),
                  ...teamLogos.map(card => ({ card, type: 'logo' }))
                ].map(({ card, type }) => {
                  const cardKey = `${type}-${card.id}`;
                  const count = collectedCards[cardKey] || 0;
                  const rarity = getRarity(card.rating);
                  const Icon = type === 'player' ? User :
                             type === 'coach' ? Users :
                             Image;
                  
                  return (
                    <div key={cardKey} 
                         className={`p-2 rounded ${count > 0 ? RARITY_COLORS[rarity] : 'bg-gray-200'} 
                                   ${count > 0 ? 'text-white' : 'text-gray-600'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon size={16} />
                          <div>
                            <p className="font-bold">{card.name}</p>
                            <p className="text-sm">Rating: {card.rating}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {count > 0 ? (
                            <span className="text-lg font-bold">×{count}</span>
                          ) : (
                            <Lock size={16} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">NBA Card Pack Opening</h1>
        <div className="flex gap-4">
          <Button onClick={() => setShowCollection(!showCollection)}>
            <BookOpen className="mr-2" />
            {showCollection ? 'Hide Collection' : 'Show Collection'}
          </Button>
          <Button onClick={openPack} disabled={isRevealing}>
            <Package className="mr-2" />
            Open Pack
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-lg">Packs Opened: {packsOpened}</p>
        <p className="text-sm">Collection Size: {collection.length} cards</p>
      </div>

      {showCollection ? (
        <CollectionView />
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {currentPack.map((card, index) => (
            <PlayerCard 
              key={index} 
              item={card.item} 
              type={card.type}
              isRevealed={!isRevealing} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardGame;