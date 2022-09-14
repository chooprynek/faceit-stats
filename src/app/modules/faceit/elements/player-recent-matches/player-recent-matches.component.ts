import {Component, Input, OnInit} from '@angular/core';
import {PlayerMatches} from "../../../../shared/interfaces/player/player-matches.interface";
import {mapsEnum} from "../../../../shared/enums/maps-enum";

@Component({
  selector: 'app-player-recent-matches',
  templateUrl: './player-recent-matches.component.html',
  styleUrls: ['./player-recent-matches.component.scss']
})
export class PlayerRecentMatchesComponent implements OnInit {

  @Input() playerMatches?: PlayerMatches[];

  matchesColumn = ['Result', 'Map', 'Score', 'K/A/D', 'K/D Ratio', 'K/R Ratio', 'HS%', '3K', '4K', '5K', 'Date', 'Demo'];
  matchUrl = 'https://www.faceit.com/en/csgo/room/';
  enumMaps = mapsEnum;
  constructor() { }

  ngOnInit(): void {
    this.playerMatches?.filter(p => p.player !== undefined).forEach((p: PlayerMatches) => {
      p.player = p.player[0];
      p.rounds = p.rounds[0];
    })
  }

  teamWinResult(data: any): boolean {
    return data.rounds?.teams[0].team_stats['Team Win'] === '0'
  }
}


