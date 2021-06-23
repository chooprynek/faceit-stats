import {PlayerMatchesDetails} from "./player-matches-details.interface";

export interface PlayerMatches {
  rounds: Round[];
  info?: PlayerMatchesDetails;
  player?: Player[];
}

export interface Round {
  best_of: string;
  competition_id: null;
  game_id: string;
  game_mode: string;
  match_id: string;
  match_round: string;
  played: string;
  round_stats: RoundStats;
  teams: Team[];
}

export interface RoundStats {
  Map: string;
  Winner: string;
  Rounds: string;
  Score: string;
  Region: string;
}

export interface Team {
  team_id: string;
  premade: boolean;
  team_stats: TeamStats;
  players: Player[];
}

export interface Player {
  player_id: string;
  nickname: string;
  player_stats: PlayerStats;
}

export interface PlayerStats {
  'K/D Ratio': string;
  Result: string;
  'K/R Ratio': string;
  'Headshots %': string;
  Assists: string;
  'Triple Kills': string;
  'Quadro Kills': string;
  Kills: string;
  Deaths: string;
  Headshot: string;
  'Penta Kills': string;
  MVPs: string;
}

export interface TeamStats {
  Team: string;
  'Team Win': string;
  'Team Headshot': string;
  'Final Score': string;
  'Overtime score': string;
  'First Half Score': string;
  'Second Half Score': string;
}
