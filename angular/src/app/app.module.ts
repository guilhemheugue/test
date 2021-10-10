import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SynoptiqueComponent } from './synoptique/synoptique.component';
import { ProbeService } from './services/probe.service';
import { MesureService } from './services/mesure.service';
import { ProbeShowComponent } from './probe-show/probe-show.component';
import { HttpClientModule } from '@angular/common/http';
import { ProbeViewComponent } from './probe-view/probe-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'synoptique', canActivate: [AuthGuard], component: SynoptiqueComponent },
  { path: 'probe/:id', canActivate: [AuthGuard], component: ProbeShowComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'synoptique', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SynoptiqueComponent,
    ProbeShowComponent,
    ProbeViewComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ProbeService,
    MesureService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
