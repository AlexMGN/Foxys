import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
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
              private toast: ToastController) { }

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
        this.auth.login(this.loginCredentials).subscribe(connect => {
                if (connect) {
                    this.nav.navigateRoot('/home');
                    this.toastControl('Connexion réussie');
                } else {
                    this.nav.navigateRoot('/login');
                    this.toastControl('Mot de passe ou email incorrect');
                }
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
