import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraalianCardComponent } from './components/graalian-card/graalian-card.component';
import { TestComponent } from './components/test/test.component';
import { PoopComponent } from './components/poop/poop.component';

@NgModule({
  declarations: [
    AppComponent,
    GraalianCardComponent,
    TestComponent,
    PoopComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
