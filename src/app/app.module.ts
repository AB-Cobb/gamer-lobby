import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlayerService } from './shared/api.player.service';
import { GameService } from './shared/api.game.service';
import { AuthService } from './auth/auth.service';

import { AdminModule} from './admin/admin.module';

import { JoinGameComponent } from './components/join-game/join-game.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { CallbackComponent } from './components/callback/callback.component';


@NgModule({
  declarations: [
    AppComponent,
    JoinGameComponent,
    AdminLoginComponent,
    PlayerRankingsComponent,
    NotFoundComponent,
    CallbackComponent,

  ],
  imports: [
    AdminModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PlayerService, GameService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
