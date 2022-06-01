import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LifeCycleComponent } from './components/life-cycle/life-cycle.component';
import { ViewEncapsulationParentComponent } from './components/ViewEncapsulation/view-encapsulation-parent/view-encapsulation-parent.component';
import { ViewEncapsulationChildComponent } from './components/ViewEncapsulation/view-encapsulation-child/view-encapsulation-child.component';
import { ViewEncapsulationChild2Component } from './components/ViewEncapsulation/view-encapsulation-child2/view-encapsulation-child2.component';

@NgModule({
  declarations: [
    AppComponent,
    LifeCycleComponent,
    ViewEncapsulationParentComponent,
    ViewEncapsulationChildComponent,
    ViewEncapsulationChild2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
