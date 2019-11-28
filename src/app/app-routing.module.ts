import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { CallbackComponent } from './components/callback/callback.component';
import { NotFoundComponent } from './components/notfound/notfound.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'player-rankings'},
  {path: 'player-rankings', component: PlayerRankingsComponent},  
  {path: 'admin-login', component: AdminLoginComponent}, 
  {path: 'callback', component: CallbackComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
