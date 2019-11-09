import { Component, OnInit, NgZone } from '@angular/core';
import { PlayerService } from './../../shared/api.player.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  playerArray: any = [];
  filteredArray: any = [];
  searchFilter: string ='';

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

  private logout(){
    this.authService.logout()
  }

  private deletePlayer(player){
    if (confirm("delete "+ player['player_name'] +"?")){
      this.playerApi.DeletePlayer(player._id).subscribe();
      console.log("deleted player: "+player['player_name']);
      //remove play from array
      let i = this.playerArray.findIndex(item => item === player)
      this.playerArray.splice(i,1)
      this.updateArrays();
    }
  }

  constructor(private playerApi: PlayerService, private authService: AuthService, private ngZone: NgZone) {
    this.playerApi.GetAllPlayers().subscribe(data=>{
          this.playerArray = data;
          this.filteredArray = data;
    })
  }
  ngOnInit() {}
}
