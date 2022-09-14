import {Component, Input} from '@angular/core';
import {MapStats} from "../../../../shared/interfaces/player/player-stats.interface";


@Component({
  selector: 'app-player-maps-stats',
  templateUrl: './player-maps-stats.component.html',
  styleUrls: ['./player-maps-stats.component.scss']
})
export class PlayerMapsStatsComponent {

  @Input() statsDetails?: MapStats[] = [];
  statsColumn = ['Map', 'Matches', 'Kills', 'Assists', 'Deaths', 'MVPs', 'AVG K/D', 'AVG HS%', '3K', '4K', '5K'];
}
