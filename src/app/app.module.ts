import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlayerService } from './shared/api.player.service';

import { PlayerListComponent } from './components/player-list/player-list.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    JoinGameComponent,
    AdminLoginComponent,
    PlayerRankingsComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    GameListComponent,
    EditGameComponent,
    
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
