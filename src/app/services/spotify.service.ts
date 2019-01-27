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
        'client_id' : '77c374b4f21f4af094bde29b7d350c38',
        'client_secret' : '9f77712849ae49c4bcaca56d002f041d'
      });

      const headers = new HttpHeaders({
          'Authorization':'Bearer BQCuRtWV75w6bNo02G8Fq6kQMLIqQ8xmPq22YvAhrdZoX_uUYNIXe1NtPYTCa1Rh-zK-g5HOhffwPfRh7Lg'
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
