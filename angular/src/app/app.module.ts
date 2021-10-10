import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SynoptiqueComponent } from './synoptique/synoptique.component';
import { ProbeService } from './services/probe.service';
import { MesureService } from './services/mesure.service';
import { ProbeShowComponent } from './probe-show/probe-show.component';
import { HttpClientModule } from '@angular/common/http';
import { ProbeViewComponent } from './probe-view/probe-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SynoptiqueComponent,
    ProbeShowComponent,
    ProbeViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProbeService,
    MesureService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
