import { Injectable } from '@angular/core';
import { Game } from './game';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  //endpoint: string = 'http://localhost:4000/api';
  endpoint :string = 'api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  // Error handling 
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = 'Error Error Abandon Ship !!!! ' + error.message;
    return throwError(errorMessage);
  }
  //Create Game
  AddGame(data:Game): Observable<any> {
    let API_URL = this.endpoint+'/add-game';
    return this.http.post(API_URL, data).pipe(
      catchError(this.errorHandler)
    )
  }
  //Read all Games
  GetAllGames(){
    return this.http.get(this.endpoint+'/get-all-games');
  }
  //get game by id
  GetPlayerById(id): Observable<any> {
    let API_URL = this.endpoint+'/get-game/'+id;
    return this.http.get(API_URL, { headers: this.headers}).pipe(
      map((res: Response) =>{
        return res || {}
      }),
      catchError(this.errorHandler)
    )
  }
  //Update game
  UpdateGame(id, data: Game): Observable<any> {
    let API_URL = this.endpoint+'/update-game/'+id;
    return this.http.put(API_URL, data, { headers: this.headers}).pipe(
      catchError(this.errorHandler)
    )
  }
  // delete game
  DeleteGame(id): Observable<any> {
    let API_URL = this.endpoint+'/delete-game/'+id;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorHandler)
    )
  }
}