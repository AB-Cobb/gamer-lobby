import { Component, OnInit, NgZone } from '@angular/core';
import { PlayerService } from './../../shared/api.player.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-rankings',
  templateUrl: './player-rankings.component.html',
  styleUrls: ['./player-rankings.component.css']
})
export class PlayerRankingsComponent implements OnInit {
  playerArray: any = [];
  filteredArray: any = [];
  searchFilter: string ='';
  Availible:String = 'Availible'
  private updateArrays() {
    if (this.searchFilter.length > 0){
      this.filteredArray = [];
      this.playerArray.forEach(player => {
        let str = '' + player['player_name']
        if (str.toLocaleUpperCase().includes(this.searchFilter.toLocaleUpperCase())){
          this.filteredArray.push(player)
        }
      })
    } else {
      this.filteredArray = Object.assign([], this.playerArray)
    }
  }

  private updateFilter(e) {
    this.searchFilter = e.target.value;
    this.updateArrays();
  }

  constructor(private playerApi: PlayerService, private authSerive: AuthService, private ngZone: NgZone, private router: Router) {
    this.playerApi.GetAllPlayers().subscribe(data=>{
      this.playerArray = data;
      this.filteredArray = data;
    })
  }
  leave_game(player){
    this.playerApi.LeaveGame(player._id).subscribe(res => {});
    let i = this.playerArray.findIndex(item => item === player)
    this.playerArray[i]['player_status'] = "Availible";
    this.updateArrays();
  }

  ngOnInit() {
  }

}
