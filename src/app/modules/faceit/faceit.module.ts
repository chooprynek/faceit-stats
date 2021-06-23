import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceitComponent } from './faceit.component';
import {FaceitRoutingModule} from "./faceit-routing.module";
import {NgxLoadingModule} from "ngx-loading";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import { PlayerMapsStatsComponent } from './elements/player-maps-stats/player-maps-stats.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { PlayerCardComponent } from './elements/player-card/player-card.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {SharedModule} from "../../shared/shared.module";
import { PlayerRecentMatchesComponent } from './elements/player-recent-matches/player-recent-matches.component';


@NgModule({
  declarations: [
    FaceitComponent,
    PlayerMapsStatsComponent,
    PlayerCardComponent,
    PlayerRecentMatchesComponent,
  ],
  imports: [
    CommonModule,
    FaceitRoutingModule,
    NgxLoadingModule,
    NzTableModule,
    NzDividerModule,
    NzToolTipModule,
    NzAvatarModule,
    NzLayoutModule,
    NzCardModule,
    NzGridModule,
    NzProgressModule,
    SharedModule
  ]
})
export class FaceitModule { }
