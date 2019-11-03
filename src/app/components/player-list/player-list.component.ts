import { Component, OnInit, NgZone } from '@angular/core';
import { PlayerService } from './../../shared/api.player.service';
import { filter } from 'minimatch';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  playerArray: any = [];
  filteredArray: any = [];
  filter: string ='';

  private updateArrays() {
    if (filter.length > 0){
      this.filteredArray = [];
      this.playerArray.forEach(player => {
        let str =''+ player['player_name']
        if (str.includes(this.filter)){
          this.filteredArray.push(player)
        }
      })
    } else {
      this.filteredArray = Object.assign([], this.playerArray)
    }
  }

  private updateFilter(e) {
    this.filter = e.target.value;
    this.updateArrays();
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

  constructor(private playerApi: PlayerService, private ngZone: NgZone) {
    this.playerApi.GetAllPlayers().subscribe(data=>{
          this.playerArray = data;
          this.filteredArray = data;
    })
  }
  ngOnInit() {}
}
