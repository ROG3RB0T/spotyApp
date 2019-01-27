import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  resultSearch: any[] = [];
  loading: boolean;

  constructor(private spotify:SpotifyService) { }

  ngOnInit() {
  }

  searchArtist(query:string)
  {
    this.loading = true;
    console.log(query);
    this.spotify.searchArtist(query)
    .subscribe(data=>{
      console.log(data);
      this.resultSearch = data;
      this.loading = false;
    });
  }

}
