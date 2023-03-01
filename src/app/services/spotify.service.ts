import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {
    console.log('Spotify Service Ready');
  }

  private getQuery(query:string)
  {
      const tokenStr = '';
      const headersToken = new HttpHeaders({
        'grant_type' : 'client_credentials',
        'client_id' : '6ddbe2804ad14e1291ecf45f449021c5',
        'client_secret' : '084737def766480fa0d11e6cd79ad28a'
      });

      const headers = new HttpHeaders({
          'Authorization':'Bearer BQAaiySNyC25KdhhIMw4t5pb5yH6tH6xOLl2Q78jk3bi4iHaWbC8sY_M-5ad16RDld5ZTh6HvzrEZfeyyNW6EehGusKZuOsLVOc3aYTv43Q4lbkWjaAL'
        });
      const url = `https://api.spotify.com/v1/${query}`;

      return this.http.get(url,{headers});

  }

  getReleases()
  {

    return this.getQuery('browse/new-releases')
    .pipe( map( data=>{
      return data['albums'].items;
    } ) );
  }
  searchArtist(q:string)
  {

    return this.getQuery('search?q='+q+'&type=artist')
        .pipe( map(data =>{
          return data['artists'].items;
        }) );
  }

  getArtist(q:string)
  {
    return this.getQuery(`artists/${q}`);
  }

  getTopTracks(q:string)
  {
    return this.getQuery(`artists/${q}/top-tracks?country=us`)
    .pipe( map (data => {
      return data['tracks'];
    }));
  }

}
