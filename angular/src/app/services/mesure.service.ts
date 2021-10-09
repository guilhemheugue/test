import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Mesure {
    date: Date;
    value: string;
}

@Injectable()
export class MesureService {
    mesuresSubject = new Subject<Mesure[]>();


    constructor(private httpClient: HttpClient) { }

    private mesures: Mesure[] = [];

    emitMesureSubject() {
        this.mesuresSubject.next(this.mesures.slice());
    }

    getMesuresFromServer(probeId: number, begin: Date | undefined, end: Date | undefined) {
        var uriParams = "";
        if (begin != undefined && end != undefined) {
            uriParams = "?begin=" + begin + "&end=" + end;
        }
        this.httpClient
            .get<Mesure[]>('http://php-fpm/probes/' + probeId + uriParams)
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