import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { EditPlayerComponent } from '../components/edit-player/edit-player.component';
import { GameListComponent } from '../components/game-list/game-list.component';
import { PlayerListComponent } from '../components/player-list/player-list.component';
import { EditGameComponent } from '../components/edit-game/edit-game.component';
import { AddGameComponent } from '../components/add-game/add-game.component';
import { AuthGuard } from '../auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../auth/interceptor.service';

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
          {path: 'player-list', component: PlayerListComponent}, 
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: 
  [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }]
})
export class AdminRoutingModule { }
