import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { AddGameComponent } from './components/add-game/add-game.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'player-rankings'},
  {path: 'player-rankings', component: PlayerRankingsComponent}, 
  {path: 'add-player', component: AddPlayerComponent}, 
  {path: 'admin-login', component: AdminLoginComponent}, 
  {path: 'edit-player/:id', component: EditPlayerComponent}, 
  {path: 'game-list', component: GameListComponent}, 
  {path: 'edit-game/:id', component: EditGameComponent},
  {path: 'add-game', component: AddGameComponent},
  {path: 'join-game/:id', component: JoinGameComponent}, 
  {path: 'player-list', component: PlayerListComponent}, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
