import {Component, Input, OnInit} from '@angular/core';
import {PlayerMatches} from "../../../../shared/interfaces/player/player-matches.interface";

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
    console.log(this.playerMatches);
  }

}

export enum mapsEnum {
  de_dust2 = 'Dust 2',
  de_inferno = 'Inferno',
  de_cache = 'Cache',
  de_mirage = 'Mirage',
  de_overpass = 'Overpass',
  de_train = 'Train',
  de_nuke = 'Nuke',
  de_cbble = 'Cobblestone',
  de_vertigo = 'Vertigo',
  de_season = 'Season'
}
