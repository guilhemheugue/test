import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProbeService } from '../services/probe.service';

@Component({
  selector: 'app-synoptique',
  templateUrl: './synoptique.component.html',
  styleUrls: ['./synoptique.component.scss']
})
export class SynoptiqueComponent implements OnInit {

  probes: any[] | undefined;
  probeSubscription: Subscription | undefined;

  constructor(private probeService: ProbeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.probeSubscription = this.probeService.getProbeSubject().subscribe(
      (probes: any[]) => {
        this.probes = probes;
      }
    );
    this.probeService.emitProbeSubject();
    if (this.authService.auth) {
      this.probeService.getProbesFromServer(this.authService.auth);
    }
  }

}
