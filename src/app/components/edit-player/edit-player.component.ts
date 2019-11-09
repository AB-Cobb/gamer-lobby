import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { PlayerService } from './../../shared/api.player.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  rankingsArray: any  = [1,2,3,4,5,6,7,8,9,10];
  gamesArray: any = ['Doom', 'Quake', 'Cyberpunk']
  statusArray: any = ['Availible' , 'Unavailible']
  currPlayer: any = {};

  editPlayerForm = this.fb.group({
    player_name : [this.currPlayer.player_name , Validators.required],
    player_rank : [this.rankingsArray[0]],
    player_score : [0],
    player_time : [0],
    player_fav_game : [this.gamesArray[0]],
    player_status : [this.statusArray[0]],
  }); 

  constructor(private fb: FormBuilder, private playerApi: PlayerService, private router: Router, private ngZone: NgZone, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.playerApi.GetPlayerById(id).subscribe(data => {
      this.editPlayerForm = this.fb.group({
        player_name : [data.player_name , Validators.required],
        player_rank : [data.player_rank],
        player_score : [data.player_score],
        player_time : [data.player_time],
        player_fav_game : [data.player_fav_game],
        player_status : [data.player_status],
      });
   })
  }

  ngOnInit() {
    console.log(this.currPlayer)
  }

  submitEditPlayerForm(){
    if (this.editPlayerForm.valid){
      let id = this.route.snapshot.paramMap.get('id');
      this.playerApi.UpdatePlayer(id,this.editPlayerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/game-list'))
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.editPlayerForm.controls[controlName].hasError(errorName);
  } 
}
