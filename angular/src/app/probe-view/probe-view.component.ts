import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Mesure } from "../services/mesure.service";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-probe-view',
  templateUrl: './probe-view.component.html',
  styleUrls: ['./probe-view.component.scss']
})
export class ProbeViewComponent implements OnInit {

  @Input() id: number | undefined;
  @Input() name: string | undefined;

  mesure: Mesure | undefined;

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getLastMesure();
  }

  getLastMesure() {
    if (this.authService.auth) {
      var beginDate = new Date();
      beginDate.setHours(beginDate.getHours() - 192);
      var begin = encodeURIComponent(formatDate(beginDate, 'yyyy-MM-dd\Thh:mm:ssZ', 'en'));
      var end = encodeURIComponent(formatDate(new Date(), 'yyyy-MM-dd\Thh:mm:ssZ', 'en'));

      console.log('http://localhost:8080/probes/' + this.id + '?auth=' + this.authService.auth + "&begin=" + begin + "&end=" + end);
      this.httpClient
        .get<Mesure[]>('http://localhost:8080/probes/' + this.id + '?auth=' + this.authService.auth + "&begin=" + begin + "&end=" + end)
        .subscribe(
          (response) => {
            this.mesure = response[response.length - 1];
            //console.log(response);
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
    }
  }

}
