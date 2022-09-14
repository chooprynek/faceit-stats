import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {PlayerDetails} from "../../../../shared/interfaces/player/player-details.interface";
import {PlayerStats} from "../../../../shared/interfaces/player/player-stats.interface";

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnChanges {

  @Input() player?: PlayerDetails;
  @Input() playerStats?: PlayerStats;
  @Input() playerRanks?: any;

  progressWidth = 0;

  faceitLevels = [
    {level: 1, rank: '1 - 800'},
    {level: 2, rank: '801 - 950'},
    {level: 3, rank: '951 - 1100'},
    {level: 4, rank: '1101 - 1250'},
    {level: 5, rank: '1251 - 1400'},
    {level: 6, rank: '1401 - 1550'},
    {level: 7, rank: '1551 - 1700'},
    {level: 8, rank: '1701 - 1850'},
    {level: 9, rank: '1851 - 2000'},
    {level: 10, rank: '2001+'}
  ];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges() {
    if (!this.player) {
      this.progressWidth = 0;
      return;
    }

    const elo = this.player?.games.csgo.faceit_elo;
    const maxElo = 2001;
    const minElo = 950;
    const elo2 = elo - minElo;
    const lvl = Math.ceil(elo2 / 149) + 2;
    const toNextLevel = 150 - Math.abs(lvl * 150 - elo2);

    if (elo > maxElo) {
      this.progressWidth = 100;
    } else if (elo <= minElo) {
      this.progressWidth = Math.round((elo / minElo) * 1000) / 100 + 10;
    } else {
      this.progressWidth = Math.round((lvl * 10 + ((toNextLevel % 151) / 150) * 10) * 10) / 10;
    }

    this.cdr.detectChanges();
  }
}
