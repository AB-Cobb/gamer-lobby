import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { PlayerService } from './../../shared/api.player.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  rankingsArray: any  = [1,2,3,4,5,6,7,8,9,10];
  gamesArray: any = ['Doom', 'Quake', 'Cyberpunk']
  statusArray: any = ['Availible' , 'Unavailible']

  constructor(private fb: FormBuilder, private playerApi: PlayerService, private router: Router, private ngZone: NgZone) { }

  addPlayerForm = this.fb.group({
    player_name : ['', Validators.required],
    player_rank : [this.rankingsArray[0]],
    player_score : [0],
    player_time : [0],
    player_fav_game : [this.gamesArray[0]],
    player_status : [this.statusArray[0]],
  });

  ngOnInit() {}

  submitAddPlayerForm(){
    if (this.addPlayerForm.valid){
      this.playerApi.AddPlayer(this.addPlayerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-list'))
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.addPlayerForm.controls[controlName].hasError(errorName);
  }  

}
