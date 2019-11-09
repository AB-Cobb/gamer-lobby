import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { GameService } from './../../shared/api.game.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})

export class AddGameComponent implements OnInit {
  platformsArray: any = ['PC','Nintendo','PlayStation','Xbox'];
  genresArray: any = [
    'Action','Adventure','Role Playing','Simulation',
    'Stratagy','Simulation','Sports'];
  ratingsArray: any = [1,2,3,4,5];
  statusArray: any = ['Active' , 'Inactive']
  currYear: Number = 2019;
  currGame: any;

  constructor(private fb: FormBuilder, private gameApi: GameService, private router: Router, private ngZone: NgZone, private route: ActivatedRoute) { 
    this.currYear = new Date().getFullYear();
  }

  addGameForm = this.fb.group({
    game_title : ['' , Validators.required],
    game_platform : [this.platformsArray[0]],
    game_genre : [this.genresArray[0]],
    game_rating : [this.ratingsArray[0]],
    game_publisher : [''],
    game_release : [this.currYear],
    game_status : [this.statusArray[0]],
  });

  ngOnInit() {}

  submitAddGameForm(){
    if (this.addGameForm.valid){
      this.gameApi.AddGame(this.addGameForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/game-list'))
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.addGameForm.controls[controlName].hasError(errorName);
  } 
}
