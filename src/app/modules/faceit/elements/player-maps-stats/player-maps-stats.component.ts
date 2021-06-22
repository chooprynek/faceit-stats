import {Component, Input, OnInit} from '@angular/core';
import {FaceitService} from "../../../../shared/services/faceit.service";
import {MapStats} from "../../../../shared/interfaces/player/player-stats.interface";


@Component({
  selector: 'app-player-maps-stats',
  templateUrl: './player-maps-stats.component.html',
  styleUrls: ['./player-maps-stats.component.scss']
})
export class PlayerMapsStatsComponent implements OnInit {

  @Input() statsDetails?: MapStats[] = [];
  statsColumn = ['Map', 'Matches', 'Kills', 'Assists', 'Deaths', 'MVPs', 'AVG K/D', 'AVG HS%', '3K', '4K', '5K'];
  constructor() { }

  ngOnInit(): void {
  }



}
