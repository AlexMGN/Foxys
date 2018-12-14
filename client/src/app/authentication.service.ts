import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  static readonly LOGIN_URL = 'https://foxyscard.herokuapp.com/login';
  static readonly REGISTER_URL = 'https://foxyscard.herokuapp.com/user';
  static readonly ADD_CARD = 'https://foxyscard.herokuapp.com/cards';

    access: boolean;
    token: string;

  constructor(public http: HttpClient) { }

    // Login
    public login(credentials) {
      this.access = false;
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw('Please insert values.');
        } else {
            return Observable.create(observer => {
                this.http.post(AuthenticationService.LOGIN_URL, credentials)
                    .pipe(map(res => res))
                    .subscribe(data => {
                        this.access = true;
                        console.log(data);
                    });

                setTimeout(() => {
                    observer.next(this.access);
                    console.log(this.access);
                }, 500);

                setTimeout(() => {
                    observer.complete();
                }, 1000);

            });
        }
    }

    // Get Token
    public getToken() {
        return this.token;
    }

    // Logout
    public logout() {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(this.access = false);
                console.log(this.access);
            }, 500);
        });
    }

    // Register
    public register(credentials) {
      if (credentials.username === null || credentials.email === null || credentials.password === null) {
            return Observable.throw('Please insert credentials');
        } else {
            return Observable.create(observer => {
                this.http.post(AuthenticationService.REGISTER_URL, credentials)
                    .pipe(map(res => res)) // on prend le resultat
                    .subscribe(); // Utilisé avec post -> envoi bdd

                observer.next(true);
                observer.complete();
            });
        }
    }

    // Add Card
    public add(credentials) {
        if (credentials.number === null || credentials.name === null) {
            return Observable.throw('Please insert credentials');
        } else if (isNaN(credentials.number)) {
            alert('Merci de n\'ajouter que des chiffres dans le numéro client');
        } else {
            return Observable.create(observer => {
                this.http.post(AuthenticationService.ADD_CARD, credentials)
                    .pipe(map(res => res)) // on prend le resultat
                    .subscribe(); // Utilisé avec post -> envoi bdd

                observer.next(true);
                observer.complete();
            });
        }
    }
}
