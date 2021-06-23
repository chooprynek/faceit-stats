import {Component, OnInit} from '@angular/core';
import {FaceitService} from "../../shared/services/faceit.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {PlayerDetails} from "../../shared/interfaces/player/player-details.interface";
import {MapStats, PlayerStats} from "../../shared/interfaces/player/player-stats.interface";
import {PlayerMatches} from "../../shared/interfaces/player/player-matches.interface";

@Component({
  selector: 'app-faceit',
  templateUrl: './faceit.component.html',
  styleUrls: ['./faceit.component.scss']
})
export class FaceitComponent implements OnInit {

  loading = false;
  player?: PlayerDetails;
  statsDetails?: MapStats[] = [];
  playerStats?: PlayerStats;
  playerMatches?: PlayerMatches[];
  playerRankings = {country: 0, region: 0};

  constructor(private faceitService: FaceitService, private route: ActivatedRoute, private webTitle: Title) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(r => {
      const nickname = r.get('nickname');
      this.webTitle.setTitle(`Statystyki gracza - ${nickname}`);
      this.getPlayerDetails(nickname);
    });
  }

  getPlayerDetails(nickname?: string | null): void {
    this.loading = true;
    this.faceitService.getPlayer(nickname).subscribe(r => {
      this.player = r;
      this.getPlayerStats(r.player_id);
      this.getPlayerRankings(r.player_id, r.games.csgo.region, r.country);
      this.getMatchHistory(r.player_id);
      this.loading = false;
    })
  }

  getPlayerStats(playerId: string | undefined): void {
    this.loading = true;
    this.faceitService.getPlayerStats(playerId).subscribe(r => {
      this.playerStats = r;
      this.statsDetails = r.segments.filter(r => r.mode === "5v5");
      this.loading = false;
    })
  }

  getMatchHistory(playerId: string | undefined) {
    this.loading = true;
    this.faceitService.getMatchHistory(playerId).subscribe(r => {
      Promise.allSettled(r.items.map((match) =>
        this.faceitService.getMatchStats(match.match_id).toPromise())).then((stats) => {
          const matchStats = stats.filter((promiseResult) => promiseResult.status === 'fulfilled').map((pr: any) => pr.value);
          matchStats.forEach((stat) => {
            this.faceitService.getMatchInfo(stat.rounds[0].match_id).subscribe((info) => (stat.info = info));
          });
          this.playerMatches = matchStats;
          this.playerMatches.map((stat) => {
            return stat.rounds.map((round) => {
              return [...round.teams[0].players, ...round.teams[1].players];
            }).map((roundPlayers) =>
              roundPlayers.find((player) => player?.player_id === playerId)
            );
          }).forEach((player: any, index: any) => {
            this.playerMatches![index].player = player;
          });
      });
      this.loading = false;
    });
  }

  getPlayerRankings(playerId: string | undefined, region: string | undefined, country: string | undefined): void {
    this.loading = true;
    this.faceitService.getRegionRank(playerId, region).subscribe(r => {
      r.items.filter(p => p.player_id === playerId).forEach(e => {
        this.playerRankings.region = e.position;
      });
      this.loading = false;
    });
    this.faceitService.getCountryRank(playerId, region, country).subscribe(r => {
      r.items.filter(p => p.player_id === playerId).forEach(e => {
        this.playerRankings.country = e.position;
      });
      this.loading = false;
    });
  }
}
