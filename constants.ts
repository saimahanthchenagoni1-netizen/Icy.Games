


import { Game, GameCategory } from './types';

export const MOCK_GAMES: Game[] = [
  {
    id: 'pixel-combat-2',
    title: 'Pixel Combat 2',
    description: 'Fight against waves of zombies in this blocky shooter. Use various weapons and survive as long as you can in this frozen wasteland of pixels!',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 42050,
    rating: 4.9
  },
  {
    id: 'survival-race',
    title: 'Survival Race',
    description: 'A high-octane survival racing game. Navigate through challenging tracks, avoid obstacles, and compete to be the last one standing!',
    category: GameCategory.RACING,
    thumbnail: 'https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 12100,
    rating: 4.6
  },
  {
    id: '1v1-battle',
    title: '1v1 Battle',
    description: 'Build, shoot, and survive in this fast-paced 1v1 arena! Practice your building skills and sharpshooting in this competitive frozen battleground.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 15600,
    rating: 4.8
  },
  {
    id: 'rooftop-snipers',
    title: 'Rooftop Snipers',
    description: 'Chaos on the rooftops! A pixelated, physics-based 2-player shooter where you must shoot your opponent off the roof to win.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 34200,
    rating: 4.7
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    description: 'A hilarious 2-player basketball game with random physics! Control your bouncy players to score baskets in changing environments.',
    category: GameCategory.SPORTS,
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 28400,
    rating: 4.8
  },
  {
    id: 'volley-random',
    title: 'Volley Random',
    description: 'A chaotic volleyball game with random physics! Jump, spike, and score in this hilarious 2-player sports game.',
    category: GameCategory.SPORTS,
    thumbnail: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 18500,
    rating: 4.7
  },
  {
    id: 'baseball-bros',
    title: 'Baseball Bros',
    description: 'Online multiplayer baseball! Strikeouts, steals, and grand slams! Hit Nukes in this fast-paced sports game.',
    category: GameCategory.SPORTS,
    thumbnail: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 12400,
    rating: 4.7
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    description: 'Dash as fast as you can! Dodge trains and obstacles in this classic endless runner set in San Francisco. Don\'t get caught!',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1517502166878-35c93c0082f9?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 95400,
    rating: 4.9
  },
  {
    id: 'polytrack',
    title: 'Polytrack',
    description: 'Race against time in this low-poly racing simulator. Master tight corners, loops, and jumps to set the best track times.',
    category: GameCategory.RACING,
    thumbnail: 'https://images.unsplash.com/photo-1611508350708-3a4697072545?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 8200,
    rating: 4.7
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    description: 'Jump, fly, and flip your way through dangerous passages and spiky obstacles in this rhythm-based action platformer!',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 125000,
    rating: 4.8
  },
  {
    id: 'crossy-road',
    title: 'Crossy Road',
    description: 'Why did the chicken cross the road? Dodge traffic, hop across logs, and avoid trains in this endless arcade hopper!',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1579309401389-a240d4f3583c?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 210500,
    rating: 4.8
  },
  {
    id: 'level-devil',
    title: 'Level Devil',
    description: 'A platformer with a mean streak. The level changes as you move, traps appear out of nowhere, and nothing is what it seems!',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 5400,
    rating: 4.6
  },
  {
    id: 'among-us',
    title: 'Among Us',
    description: 'Play online or local WiFi with 4-10 players as you attempt to prep your spaceship for departure, but beware as one will be an impostor bent on killing everyone!',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 330000,
    rating: 4.9
  },
  {
    id: 'sf-alpha-3',
    title: 'Street Fighter Alpha 3',
    description: 'Classic arcade fighting action! Choose your fighter and battle your way to the top in this legendary Capcom fighter.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 14500,
    rating: 4.8
  },
  {
    id: 'ben-10-alien-force',
    title: 'Ben 10 Alien Force',
    description: 'Transform into alien heroes and battle intergalactic threats! Use the Omnitrix to defeat enemies in this action-packed adventure.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1605218427306-635ba2496ed9?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 18900,
    rating: 4.7
  },
  {
    id: 'pokemon-emerald',
    title: 'Pokemon Emerald',
    description: 'Catch them all! Travel through the Hoenn region, battle gym leaders, and stop Team Magma and Team Aqua in this classic GBA adventure.',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800&auto=format&fit=crop',
    isHot: true,
    playedCount: 45200,
    rating: 4.9
  },
  {
    id: 'gta',
    title: 'Grand Theft Auto',
    description: 'The game that started it all. Experience the original top-down open-world crime simulator.',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    playedCount: 25000,
    rating: 4.6
  }
];

export const SYSTEM_INSTRUCTION = `You are "Icy", the official mascot and assistant of the ICY Unblocked Games website. 
Your personality is cool, chill, and slightly punny (winter puns). 
You help users find games, give tips on how to beat levels, and generally chat about gaming and winter. 
Keep responses concise (under 50 words usually).
The available games are:
1. Pixel Combat 2 (Zombie shooter)
2. 1v1 Battle (Building shooter)
3. Rooftop Snipers (Physics shooter)
4. Basket Random (Sports)
5. Volley Random (Sports)
6. Baseball Bros (Sports)
7. Subway Surfers (Endless runner)
8. Polytrack (Racing time-trial)
9. Geometry Dash (Rhythm platformer)
10. Crossy Road (Endless hopper)
11. Level Devil (Troll platformer)
12. Among Us (Social deduction)
13. Street Fighter Alpha 3 (Fighting)
14. Ben 10 Alien Force (Action Adventure)
15. Pokemon Emerald (RPG)
16. Grand Theft Auto (Action)
17. Survival Race (Racing)`;