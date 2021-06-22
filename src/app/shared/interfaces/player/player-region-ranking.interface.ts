export interface PlayerRanking {
  position: number;
  items: Item[];
  start: number;
  end: number;
}

export interface Item {
  player_id: string;
  nickname: string;
  country: string;
  position: number;
  faceit_elo: number;
  game_skill_level: number;
}
