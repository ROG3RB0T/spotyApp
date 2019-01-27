import { Component, OnInit } from '@angular/core';

import {SpotifyService} from '../../services/spotify.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  error: boolean = false;
  messageError: string;
  newreleases:any[] =[];
  loading: boolean = true;
  constructor(private spotify:SpotifyService) {
    this.spotify.getReleases()
    .subscribe(data=>{
      console.log(data);
      this.newreleases = data;
      this.loading = false;
    }, (errorService => {
      this.error = true;
      console.log(errorService.error.error.message);
      this.loading = false;
      this.messageError = errorService.message;
    }));
  }

  ngOnInit() {
  }

}
