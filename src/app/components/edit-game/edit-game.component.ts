import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { GameService } from './../../shared/api.game.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
  platformsArray: any = ['PC','Nintendo','PlayStation','Xbox'];
  genresArray: any = [
    'Action','Adventure','Role Playing','Simulation',
    'Stratagy','Simulation','Sports'];
  ratingsArray: any = [1,2,3,4,5];
  statusArray: any = ['Active' , 'Inactive']
  currYear: Number;


  editGameForm = this.fb.group({
    game_title : ['' , Validators.required],
    game_platform : [this.platformsArray[0]],
    game_genre : [this.genresArray[0]],
    game_rating : [this.ratingsArray[0]],
    game_publisher : ['', Validators.required],
    game_release : [this.currYear],
    game_status : [this.statusArray[0]],
  });

  get game_title(){ return this.editGameForm.get('game_title')}
  get game_publisher(){ return this.editGameForm.get('game_publisher')}

  constructor(private fb: FormBuilder, private gameApi: GameService, private router: Router, private ngZone: NgZone, private route: ActivatedRoute) { 
    let id = this.route.snapshot.paramMap.get('id');
    this.gameApi.GetPlayerById(id).subscribe(data => {
      this.editGameForm = this.fb.group({
        game_title : [data.game_title , Validators.required],
        game_platform : [data.game_platform],
        game_genre : [data.game_genre],
        game_rating : [data.game_rating],
        game_publisher : [data.game_publisher],
        game_release : [data.game_release],
        game_status : [data.game_status],
      })
    })
    this.currYear = new Date().getFullYear();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.editGameForm.controls[controlName].hasError(errorName);
  }

  submitEditGameForm(){
    if (this.editGameForm.valid){
      let id = this.route.snapshot.paramMap.get('id');
      this.gameApi.UpdateGame(id,this.editGameForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin/game-list'))
      });
    }
  }

  ngOnInit() {
  }

}
