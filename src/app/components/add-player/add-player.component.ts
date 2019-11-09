import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { PlayerService } from './../../shared/api.player.service';
import { GameService } from './../../shared/api.game.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  rankingsArray: any  = [1,2,3,4,5,6,7,8,9,10];
  gamesArray: any = []
  statusArray: any = ['Availible' , 'Unavailible']
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private playerApi: PlayerService,private gameApi: GameService, private router: Router, private ngZone: NgZone) { 
    this.gameApi.GetAllGames().subscribe( data => {
      for (let game of Object.keys(data)){
        this.gamesArray.push(data[game]['game_title'])
      }
    });
  }

  addPlayerForm = this.fb.group({
    player_name : ['', Validators.required],
    player_rank : [this.rankingsArray[0]],
    player_score : [0],
    player_time : [0],
    player_fav_game : [this.gamesArray[0]],
    player_status : [this.statusArray[0]],
  });

  get player_name() {return this.addPlayerForm.get("player_name")}

  ngOnInit() {}

  submitAddPlayerForm(){
    this.submitted = true;
    if (this.addPlayerForm.valid){
      this.playerApi.AddPlayer(this.addPlayerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin/player-list'))
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.addPlayerForm.controls[controlName].hasError(errorName);
  }  

}
