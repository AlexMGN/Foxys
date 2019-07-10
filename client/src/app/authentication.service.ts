import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Shop } from './interface/shop';


@Injectable()
export class AuthenticationService {

  static readonly REGISTER_URL = 'https://foxyscard.herokuapp.com/user';
  static readonly USER_URL = 'https://foxyscard.herokuapp.com/users';
  static readonly LOGIN_URL = 'https://foxyscard.herokuapp.com/login';
  static readonly ADD_CARD = 'https://foxyscard.herokuapp.com/cards';
  static readonly SHOPS = 'https://foxyscard.herokuapp.com/shops';

    access: boolean;
    token: any;
    shops: Shop[];

  constructor(public http: HttpClient,
              public storage: NativeStorage) {}

    // Login
    public login(credentials) {
          return this.http.post(AuthenticationService.LOGIN_URL, credentials)
              .pipe(tap(token => {
                  this.storage.setItem('token', token)
                          .then(
                              () => {
                                  console.log('Token Stored');
                              },
                              error => console.error('Error storing item', error)
                          );
                      this.token = token;
                      this.access = true;
                      return token;
                  }),
              );
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

    // Get User
    getAccount() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': localStorage.getItem('_token')
            })
        };
        return this
            .http
            .get(AuthenticationService.USER_URL, httpOptions);
    }


    // Get Card
    getCards() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('_token')
            })
        };
        return this.http.get(AuthenticationService.ADD_CARD, httpOptions);
    }


    // Get Card
    getShops() {
        return this.http.get(AuthenticationService.SHOPS);
    }

    // Add Card
    public add(credentials) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('_token')
            })
        };
        if (credentials.number === null || credentials.name === null) {
            return Observable.throw('Please insert credentials');
        } else if (isNaN(credentials.number)) {
            alert('Merci de n\'ajouter que des chiffres dans le numéro client');
        } else {
            return Observable.create(observer => {
                this.http.post(AuthenticationService.ADD_CARD, credentials, httpOptions)
                    .pipe(map(res => res)) // on prend le resultat
                    .subscribe(); // Utilisé avec post -> envoi bdd

                observer.next(true);
                observer.complete();
            });
        }
    }

    public user() {
      const headers = new HttpHeaders({
          'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
      });

      return this.http.get(AuthenticationService.USER_URL, { headers: headers })
          .pipe(
              tap(user => {
                return user;
              })
          );
    }

    public getToken() {
      return this.storage.getItem('token').then(
          data => {
              this.token = data;

              if (this.token != null) {
                  this.access = true;
              } else {
                  this.access = false;
              }
          },
          error => {
              this.token = null;
              this.access = false;
          }
      );
    }

}

