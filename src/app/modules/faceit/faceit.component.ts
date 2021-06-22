import { Component, OnInit } from '@angular/core';
import {FaceitService} from "../../shared/services/faceit.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {PlayerDetails} from "../../shared/interfaces/player/player-details.interface";
import {MapStats, PlayerStats} from "../../shared/interfaces/player/player-stats.interface";
import * as _ from 'lodash';

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
  playerRankings = {country: 0, region: 0};

  constructor(private faceitService: FaceitService, private route: ActivatedRoute, private webTitle: Title) { }

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
      console.log(r);
      this.player = r;

      this.getPlayerStats(r.player_id);
      this.getRegionRanking(r.player_id, r.games.csgo.region);
      this.getCountryRanking(r.player_id, r.games.csgo.region, r.country);
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

  getRegionRanking(playerId: string | undefined, region: string | undefined): void {
    this.loading = true;
    this.faceitService.getRegionRank(playerId, region).subscribe(r => {
      r.items.filter(p => p.player_id === playerId).forEach(e => {
        this.playerRankings.region = e.position;
      });
    })
  }

  getCountryRanking(playerId: string | undefined, region: string | undefined, country: string | undefined): void {
    this.loading = true;
    this.faceitService.getCountryRank(playerId, region, country).subscribe(r => {
        r.items.filter(p => p.player_id === playerId).forEach(e => {
          this.playerRankings.country = e.position;
      })
    })
  }
}
