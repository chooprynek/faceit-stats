import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchList} from "../interfaces/seach/search-list.inteface";
import {PlayerDetails} from "../interfaces/player/player-details.interface";
import {PlayerStats} from "../interfaces/player/player-stats.interface";
import {PlayerRanking} from "../interfaces/player/player-region-ranking.interface";
import {PlayerHistory} from "../interfaces/player/player-history.interface";
import {PlayerMatchesDetails} from "../interfaces/player/player-matches-details.interface";
import {PlayerMatches} from "../interfaces/player/player-matches.interface";

@Injectable({
  providedIn: 'root'
})
export class FaceitService {

  apiUrl = 'https://open.faceit.com/data/v4/';

  constructor(private http: HttpClient) {
  }

  getPlayer(nickname?: string): Observable<PlayerDetails> {
    return this.http.get<PlayerDetails>(`${this.apiUrl}players?nickname=${nickname}`);
  }

  getPlayerStats(playerId?: string): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(`${this.apiUrl}players/${playerId}/stats/csgo`);
  }

  getRegionRank(playerId?: string, region?: string): Observable<PlayerRanking> {
    return this.http.get<PlayerRanking>(`${this.apiUrl}rankings/games/csgo/regions/${region}/players/${playerId}&limit=2`);
  }

  getCountryRank(playerId?: string, region?: string, country?: string): Observable<PlayerRanking> {
    return this.http.get<PlayerRanking>(`${this.apiUrl}rankings/games/csgo/regions/${region}/players/${playerId}?country=${country}&limit=2`);
  }

  getMatchHistory(playerId?: string): Observable<PlayerHistory> {
    return this.http.get<PlayerHistory>(`${this.apiUrl}players/${playerId}/history?game=csgo&from=1420070400&limit=15`);
  }

  getMatchInfo(matchId: string):Observable<PlayerMatchesDetails> {
    return this.http.get<PlayerMatchesDetails>(`${this.apiUrl}matches/${matchId}`);
  }

  getMatchStats(matchId: string): Observable<PlayerMatches> {
    return this.http.get<PlayerMatches>(`${this.apiUrl}matches/${matchId}/stats`);
  }

  getSearchedPlayers(nickname: string): Observable<SearchList> {
    return this.http.get<SearchList>(`${this.apiUrl}search/players?nickname=${nickname}&game=csgo&offset=0&limit=5`);
  }
}
