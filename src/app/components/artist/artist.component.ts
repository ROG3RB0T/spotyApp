import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent {

  artist: any = {};
  tracks: any[] = [];
  loading:boolean;
  constructor(private spotify:SpotifyService, private router: ActivatedRoute) {
      this.getArtist();
      this.getTopTracks();
   }

   getArtist()
   {
     this.router.params.subscribe( params => {
       this.loading = true;
       this.spotify.getArtist(params['id'])
       .subscribe( data => {
         console.log(data);
         this.artist = data;
         this.loading = false;
       });
     });
   }

   getTopTracks()
   {
     this.router.params.subscribe( params => {
       this.loading = true;
       this.spotify.getTopTracks(params['id'])
       .subscribe(data =>{
         console.log(data);
         this.tracks = data;
       });
     });
   }

}
