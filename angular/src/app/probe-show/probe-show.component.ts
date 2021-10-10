import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MesureService } from '../services/mesure.service';
import { ProbeService } from '../services/probe.service';

@Component({
  selector: 'app-probe-show',
  templateUrl: './probe-show.component.html',
  styleUrls: ['./probe-show.component.scss']
})
export class ProbeShowComponent implements OnInit {

  name: string | undefined;

  mesures: any[] | undefined;
  mesuresSubscription: Subscription | undefined;

  begin: Date = new Date();
  end: Date = new Date();

  constructor(private probeService: ProbeService, private mesureService: MesureService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.begin.setMonth(this.begin.getMonth() - 1);
    const id = this.route.snapshot.params['id'];
    this.mesuresSubscription = this.mesureService.getMesureSubject().subscribe(
      (mesures: any[]) => {
        this.mesures = mesures;
      }
    );
    this.mesureService.emitMesureSubject();
    this.name = this.probeService.getProbeById(id)?.name;

    if (this.authService.auth) {
      this.mesureService.getMesuresFromServer(id, this.authService.auth, this.begin, this.end);
    }
  }

  updateGraph(): void {
    const id = this.route.snapshot.params['id'];
    if (this.authService.auth) {
      this.mesureService.getMesuresFromServer(id, this.authService.auth, this.begin, this.end);
    }
  }

  getName(): string | undefined {
    return this.name;
  }


}
