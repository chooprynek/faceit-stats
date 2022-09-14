import {Component, OnInit} from '@angular/core';
import {FaceitService} from "../../shared/services/faceit.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {PlayerDetails} from "../../shared/interfaces/player/player-details.interface";
import {MapStats, PlayerStats} from "../../shared/interfaces/player/player-stats.interface";
import {PlayerMatches, Round} from "../../shared/interfaces/player/player-matches.interface";
import {async, lastValueFrom} from "rxjs";
import {Item} from "../../shared/interfaces/player/player-history.interface";
import {PlayerMatchesDetails} from "../../shared/interfaces/player/player-matches-details.interface";

@Component({
  selector: 'app-faceit',
  templateUrl: './faceit.component.html',
  styleUrls: ['./faceit.component.scss']
})
export class FaceitComponent implements OnInit {

  playerData = false;
  playerMaps = false;
  playerHistory = false;

  player?: PlayerDetails;
  statsDetails?: MapStats[] = [];
  playerStats?: PlayerStats;
  playerMatches?: PlayerMatches[];
  playerRankings = {country: 0, region: 0};

  constructor(private faceit: FaceitService,
              private route: ActivatedRoute,
              private webTitle: Title) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (r: any) => {
        const nickname = r.get('nickname') ?? '';
        this.webTitle.setTitle(`Statystyki gracza - ${nickname}`);
        this.getPlayerDetails(nickname);
      }
    });
  }

  getPlayerDetails(nickname: string): void {
    this.playerData = true;
    this.faceit.getPlayer(nickname).subscribe({
      next: (r: any) => {
        this.player = r;
        this.getPlayerStats(r.player_id);
        this.getPlayerRankings(r.player_id, r.games.csgo.region, r.country);
        this.getMatchHistory(r.player_id);
      },
      complete: () => {
        this.playerData = false;
      }
    });
  }

  getPlayerStats(playerId: string): void {
    this.playerMaps = true;
    this.faceit.getPlayerStats(playerId).subscribe({
      next: (r: any) => {
        this.playerStats = r;
        this.statsDetails = r.segments.filter((r: any) => r.mode === "5v5");
      },
      complete: () => {
        this.playerMaps = false;
      }
    })
  }

  getMatchHistory(playerId: string | undefined) {
    this.playerHistory = true;
    this.faceit.getMatchHistory(playerId).subscribe({
      next: (r: any) => {
        Promise.allSettled(r.items.map((match: Item) =>
          lastValueFrom(this.faceit.getMatchStats(match.match_id)))).then((stats) => {
          const matchStats = stats.filter((lv) => lv.status === 'fulfilled').map((pr: any) => pr.value);
          matchStats.forEach((stat) => this.faceit.getMatchInfo(stat.rounds[0].match_id).subscribe((info: PlayerMatchesDetails) => (stat.info = info)));
          this.playerMatches = matchStats;
          this.playerMatches.map((stat) => {
            return stat.rounds.map((round: Round) => {
              return [...round.teams[0].players, ...round.teams[1].players];
            }).map((roundPlayers: Round[]) =>
              roundPlayers.find((player: any) => player?.player_id === playerId)
            );
          }).forEach((player: any, index: any) => {
            this.playerMatches![index].player = player;
          });
        });
      },
      complete: () => {
        this.playerHistory = false;
      }
    })
  }

  getPlayerRankings(playerId?: string, region?: string, country?: string): void {
    this.faceit.getRegionRank(playerId, region).subscribe({
      next: (r: any) => {
        r.items.filter((p: any) => p.player_id === playerId).forEach((e: any) => this.playerRankings.region = e.position);
      }
    });

    this.faceit.getCountryRank(playerId, region, country).subscribe({
      next: (r: any) => {
        r.items.filter((p: any) => p.player_id === playerId).forEach((e: any) => this.playerRankings.country = e.position);
      }
    });
  }
}
