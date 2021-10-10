import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MesureService } from '../services/mesure.service';

@Component({
  selector: 'app-probe-show',
  templateUrl: './probe-show.component.html',
  styleUrls: ['./probe-show.component.scss']
})
export class ProbeShowComponent implements OnInit {

  @Input() id: number | undefined;
  @Input() name: string | undefined;

  mesures: any[] | undefined;
  mesuresSubscription: Subscription | undefined;

  constructor(private mesureService: MesureService) { }

  ngOnInit(): void {
    this.mesuresSubscription = this.mesureService.getMesureSubject().subscribe(
      (mesures: any[]) => {
        this.mesures = mesures;
      }
    );
    this.mesureService.emitMesureSubject();
    if (this.id) {

      var begin = new Date();
      begin.setMonth(begin.getMonth() - 1);

      this.mesureService.getMesuresFromServer(this.id, begin, new Date());
    }
  }

  getName(): string | undefined {
    return this.name;
  }


}
