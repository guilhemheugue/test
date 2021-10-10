import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

interface Probe {
    id: number;
    name: string;
}

function wait(ms: any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

@Injectable()
export class ProbeService {
    private probeSubject = new Subject<Probe[]>();

    constructor(private httpClient: HttpClient) {
    }

    private probes: Probe[] = [
        {
            id: 1,
            name: "test",
        }
    ];

    getProbeSubject(): Subject<Probe[]> {
        return this.probeSubject;
    }

    getProbeById(id: number) {
        return this.probes.find(probe => probe.id === Number(id));
    }

    setProbes(probes: Probe[]): void {
        this.probes = probes;
    }

    emitProbeSubject() {
        this.probeSubject.next(this.probes.slice());
    }

    getProbesFromServer() {
        this.httpClient
            .get<Probe[]>('http://localhost:8080/probes/')
            .subscribe(
                (response) => {
                    this.setProbes(response);
                    this.emitProbeSubject();
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );
    }
}