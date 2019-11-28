import { Injectable } from '@angular/core';
import { Player } from './player';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  //endpoint: string = 'http://localhost:4000/api';
  endpoint :string = 'api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private authService: AuthService) { }

  // Error handling 
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = 'Error Error Abandon Ship !!!! ' + error.message;
    return throwError(errorMessage);
  }

  //Create player
  AddPlayer(data:Player): Observable<any> {
    let API_URL = this.endpoint+'/add-player';
    return this.http.post(API_URL, data).pipe(
      catchError(this.errorHandler)
    )
  }
  //Read all Players
  GetAllPlayers(){
    return this.http.get(this.endpoint+'/get-all-players');
  }
  //get player by id
  GetPlayerById(id): Observable<any> {
    let API_URL = this.endpoint+'/get-player/'+id;
    return this.http.get(API_URL, { headers: this.headers}).pipe(
      map((res: Response) =>{
        return res || {}
      }),
      catchError(this.errorHandler)
    )
  }
  //Update player
  UpdatePlayer(id, data: Player): Observable<any> {
    console.log('updating ' + data);
    let API_URL = this.endpoint+'/update-player/'+id;
    return this.http.put(API_URL, data, { headers: this.headers}).pipe(
      catchError(this.errorHandler)
    )
  }
  //Join Game
  JoinGame(id, data: Player): Observable<any> {
    console.log("Joining Game")
    let API_URL = this.endpoint+'/join_game/'+id;
    return this.http.put(API_URL, data)
  }
  //Leave Game
  LeaveGame(id): Observable<any> {
    console.log("Leave Game")
    let API_URL = this.endpoint+'/exit_game/'+id;
    return this.http.put(API_URL, id)
  }


  // delete player
  DeletePlayer(id): Observable<any> {
    let API_URL = this.endpoint+'/delete-player/'+id;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorHandler)
    )
  }
}
