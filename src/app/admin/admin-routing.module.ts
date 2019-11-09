import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
//import { AdminLoginComponent } from '../components/admin-login/admin-login.component';
import { EditPlayerComponent } from '../components/edit-player/edit-player.component';
import { GameListComponent } from '../components/game-list/game-list.component';
import { JoinGameComponent } from '../components/join-game/join-game.component';
import { PlayerListComponent } from '../components/player-list/player-list.component';
import { EditGameComponent } from '../components/edit-game/edit-game.component';
import { AddGameComponent } from '../components/add-game/add-game.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    children: [
          {path: 'add-player', component: AddPlayerComponent}, 
          {path: 'edit-player/:id', component: EditPlayerComponent}, 
          {path: 'game-list', component: GameListComponent}, 
          {path: 'edit-game/:id', component: EditGameComponent},
          {path: 'add-game', component: AddGameComponent},
          {path: 'join-game/:id', component: JoinGameComponent}, 
          {path: 'player-list', component: PlayerListComponent}, 
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
