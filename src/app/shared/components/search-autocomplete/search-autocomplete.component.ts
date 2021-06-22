import {AfterViewInit, Component} from '@angular/core';
import {FaceitService} from "../../services/faceit.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {Item} from "../../interfaces/seach/search-list.inteface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements AfterViewInit {

  nickControl = new FormControl();
  playersList: Item[] = [];
  dataLoadingIndicator = true;

  constructor(private faceitService: FaceitService, private router: Router) {
  }

  ngAfterViewInit() {
    this.nickControl?.valueChanges.pipe(debounceTime(300)).subscribe(r => {
      if (r) {
        this.dataLoadingIndicator = true;
        this.faceitService.getSearchedPlayers(r).subscribe(r => {
          this.playersList = r.items
          this.dataLoadingIndicator = false;
        });
      } else {
        this.playersList = [];
      }
    })
  }

  redirect(nickname: string) {
    this.router.navigateByUrl(`player/${nickname}`);
  }
}
