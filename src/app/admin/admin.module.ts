import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { PlayerService } from '../shared/api.player.service';
import { GameService } from '../shared/api.game.service';

import { PlayerListComponent } from '../components/player-list/player-list.component';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { EditPlayerComponent } from '../components/edit-player/edit-player.component';
import { GameListComponent } from '../components/game-list/game-list.component';
import { EditGameComponent } from '../components/edit-game/edit-game.component';
import { AddGameComponent } from '../components/add-game/add-game.component';

@NgModule({
  declarations: [
    PlayerListComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    GameListComponent,
    EditGameComponent,
    AddGameComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [PlayerService, GameService],
  //bootstrap: [AdminModule]
})
export class AdminModule { }
