export interface PlayerStats {
  player_id: string;
  game_id: string;
  lifetime: Lifetime;
  segments: MapStats[];
}

export interface Lifetime {
  Matches: string;
  Wins: string;
  "Average K/D Ratio": string;
  "Average Headshots %": string;
  "Recent Results": string[];
  "Win Rate %": string;
  "K/D Ratio": string;
  "Total Headshots %": string;
  "Longest Win Streak": string;
  "Current Win Streak": string;
}

export interface MapStats {
  stats: Stats;
  type: string;
  mode: string;
  label: string;
  img_small: string;
  img_regular: string;
}

export interface Stats {
  Matches: string;
  "Penta Kills": string;
  "Average Penta Kills": string;
  "Average Deaths": string;
  "Headshots per Match": string;
  "Triple Kills": string;
  "Average Triple Kills": string;
  "Average Assists": string;
  Deaths: string;
  "Average Quadro Kills": string;
  "Average Kills": string;
  "Average K/R Ratio": string;
  Rounds: string;
  "Quadro Kills": string;
  "Total Headshots %": string;
  MVPs: string;
  "Win Rate %": string;
  Kills: string;
  Headshots: string;
  Wins: string;
  "Average K/D Ratio": string;
  Assists: string;
  "K/R Ratio": string;
  "K/D Ratio": string;
  "Average MVPs": string;
  "Average Headshots %": string;
}
