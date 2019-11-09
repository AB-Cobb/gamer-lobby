import { Component, OnInit, NgZone } from '@angular/core';
import { GameService } from './../../shared/api.game.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  gameArray: any = [];
  filteredArray: any = [];
  searchFilter: string ='';

  private updateArrays() {
    if (this.searchFilter.length > 0){
      this.filteredArray = [];
      this.gameArray.forEach(player => {
        let str = '' + player['player_name']
        if (str.toLocaleUpperCase().includes(this.searchFilter.toLocaleUpperCase())){
          this.filteredArray.push(player)
        }
      })
    } else {
      this.filteredArray = Object.assign([], this.gameArray)
    }
  }

  private updateFilter(e) {
    this.searchFilter = e.target.value;
    this.updateArrays();
  }

  constructor(private gameApi: GameService, private ngZone: NgZone) {
    this.gameApi.GetAllGames().subscribe(data=>{
          this.gameArray = data;
          this.filteredArray = data;
    })
  }

  private deleteGame(game){
    if (confirm("delete "+ game['game_title'] +"?")){
      this.gameApi.DeleteGame(game._id).subscribe();
      console.log("deleted game: "+game['game_title']);
      //remove play from array
      let i = this.gameArray.findIndex(item => item === game)
      this.gameArray.splice(i,1)
      this.updateArrays();
    }
  }

  ngOnInit() {}

}
