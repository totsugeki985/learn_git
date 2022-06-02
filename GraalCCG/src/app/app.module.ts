import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router"
import { AppComponent } from './app.component';
import { GraalianCardComponent } from './components/graalian-card/graalian-card.component';
import { TestComponent } from './components/test/test.component';
import { PoopComponent } from './components/poop/poop.component';
import { MatchGameComponent } from './components/match-game/match-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GraalianCardComponent,
    TestComponent,
    PoopComponent,
    MatchGameComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
