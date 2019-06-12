import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginCredentials = { email: '', password: '' };

    constructor(public nav: NavController,
              private auth: AuthenticationService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private toast: ToastController,
                private plateform: Platform) { }

  ngOnInit() {
  }

    async toastControl (msg: string) {
        const daToast = await this.toast.create({
            message: msg,
            duration: 500,
            position: 'bottom'
        });
        daToast.present();
    }

    public createAccount() {
        this.nav.navigateRoot('/register');
    }

    public login() {
            this.auth.login(this.loginCredentials).subscribe((data: any) => {
                localStorage.setItem('_token', data.token);
                this.toastControl('Connexion réussie');
            },
            error => {
                console.log(error);
                this.toastControl('Erreur : Connexion impossible');
            },
            () => {
                this.nav.navigateRoot('/home');
            });
    }

    public noSpace() {
        if ((<any>event).keyCode === 32) {
            return false;
        } else {
            return true;
        }
    }

}
