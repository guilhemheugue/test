import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

interface Mesure {
    date: Date;
    value: string;
}

@Injectable()
export class MesureService {
    mesuresSubject = new Subject<Mesure[]>();


    constructor(private httpClient: HttpClient) { }

    private mesures: Mesure[] = [];

    getMesureSubject(): Subject<Mesure[]> {
        return this.mesuresSubject;
    }

    emitMesureSubject() {
        this.mesuresSubject.next(this.mesures.slice());
    }

    getMesuresFromServer(probeId: number, auth: string, begin: Date | undefined, end: Date | undefined) {
        console.log("coucou");
        var uriParams = "?auth=" + auth;
        if (begin != undefined && end != undefined) {
            var beginUri = encodeURIComponent(formatDate(begin, 'yyyy-MM-dd\Thh:mm:ssZ', 'en'));
            var endUri = encodeURIComponent(formatDate(end, 'yyyy-MM-dd\Thh:mm:ssZ', 'en'));

            uriParams = uriParams + "&begin=" + beginUri + "&end=" + endUri;
        }
        console.log('http://localhost:8080/probes/' + probeId + uriParams);
        this.httpClient
            .get<Mesure[]>('http://localhost:8080/probes/' + probeId + uriParams)
            .subscribe(
                (response) => {
                    this.mesures = response;
                    this.emitMesureSubject();
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }
}