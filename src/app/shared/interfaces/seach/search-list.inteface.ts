export interface SearchList {
  items: Item[];
  start: number;
  end: number;
}

export interface Item {
  player_id: string;
  nickname: string;
  status: string;
  games: Game[];
  country: string;
  verified: boolean;
  avatar: string;
}

export interface Game {
  name: string;
  skill_level: string;
}
