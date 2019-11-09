import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { PlayerService } from './../../shared/api.player.service';
import { GameService } from './../../shared/api.game.service';
import { Player } from './../../shared/player';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  currPlayer = new Player();
  gamesArray: any = []
  
  joinGameForm = this.fb.group({
    select_game : ['Selecet a Game']
  })

  constructor(private fb: FormBuilder, private playerApi: PlayerService, private gameApi: GameService,  private router: Router, private ngZone: NgZone, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    this.playerApi.GetPlayerById(id).subscribe(data => {
      this.currPlayer  = Object.assign({}, data);
      console.log(data);
      console.log(this.currPlayer);
    });
    this.gameApi.GetAllGames().subscribe( data => {
      for (let game of Object.keys(data)){
        if (data[game]['game_status'] == 'Active')
          this.gamesArray.push(data[game]['game_title'])
      }
    });
   }

  private joinGameSubmit(){
    console.log("hello")
    if (this.joinGameForm.valid){
      this.currPlayer.player_status = 'Unavailible';
      console.log(this.currPlayer);
      this.playerApi.UpdatePlayer(this.currPlayer._id, this.currPlayer).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      });
    }
  }

  ngOnInit() {
  }

}
