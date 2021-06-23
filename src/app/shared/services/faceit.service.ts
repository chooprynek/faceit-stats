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


  constructor(private http: HttpClient) {
  }

  getPlayer(nickname?: string | null | undefined): Observable<PlayerDetails> {
    return this.http.get<PlayerDetails>(environment.apiUrl + nickname);
  }

  getPlayerStats(playerId: string | undefined): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(`${environment.apiPlayers}${playerId}/stats/csgo`);
  }

  getRegionRank(playerId: string | undefined, region: string | undefined): Observable<PlayerRanking> {
    return this.http.get<PlayerRanking>(`${environment.apiRank}${region}/players/${playerId}&limit=2`);
  }

  getCountryRank(playerId: string | undefined, region: string | undefined, country: string | undefined): Observable<PlayerRanking> {
    return this.http.get<PlayerRanking>(`${environment.apiRank}${region}/players/${playerId}?country=${country}&limit=2`);
  }

  getMatchHistory(playerId: string | undefined): Observable<PlayerHistory> {
    return this.http.get<PlayerHistory>(`${environment.apiPlayers}${playerId}/history?game=csgo&from=1420070400&limit=15`);
  }

  getMatchInfo(matchId: string):Observable<PlayerMatchesDetails> {
    return this.http.get<PlayerMatchesDetails>(`${environment.apiMatch}${matchId}`);
  }

  getMatchStats(matchId: string): Observable<PlayerMatches> {
    return this.http.get<PlayerMatches>(`${environment.apiMatch}${matchId}/stats`);
  }

  getSearchedPlayers(nickname: string): Observable<SearchList> {
    return this.http.get<SearchList>(`${environment.apiSearch}${nickname}&game=csgo&offset=0&limit=5`);
  }
}
