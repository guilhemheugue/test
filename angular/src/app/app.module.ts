import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SynoptiqueComponent } from './synoptique/synoptique.component';

@NgModule({
  declarations: [
    AppComponent,
    SynoptiqueComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
