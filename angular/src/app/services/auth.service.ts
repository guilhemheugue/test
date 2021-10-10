import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface Login {
    "auth-id": string
}

@Injectable()
export class AuthService {

    constructor(private httpClient: HttpClient) { }
    isAuth = false;
    auth: string | undefined;

    signIn(password: string) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                    .post<Login>('http://localhost:8080/login', { password: password })
                    .subscribe(
                        (response) => {
                            this.auth = response["auth-id"];
                            this.isAuth = true;
                            resolve(true);
                        },
                        (error) => {
                            console.log('Erreur ! : ' + error);
                            reject(true);
                        }
                    );
            }
        );
    }

    signOut() {
        this.isAuth = false;
    }
}