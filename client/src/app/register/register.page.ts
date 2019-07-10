import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerCredentials = { username: '', email: '', password: '', confirmPass: '' };

    submitted = false;

    verifMail = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

  constructor(private auth: AuthenticationService,
              public nav: NavController,
              private toast: ToastController) { }

  ngOnInit() {
  }

    async toastControl (msg: string) {
        const daToast = await this.toast.create({
            message: msg,
            duration: 5000,
            position: 'bottom'
        });
        daToast.present();
    }

    public register() {
      this.submitted = true;
      if (this.registerCredentials.username.length < 5) {
          this.toastControl('Le nom d\'utilisateur ne peut pas être \ninférieur à 5 caractères.');
      } else if (!this.verifMail.test(this.registerCredentials.email)) {
          this.toastControl('L\'email n\'est pas valide.');
      } else if (this.registerCredentials.password !== this.registerCredentials.confirmPass) {
            this.toastControl('Les deux mots de passes sont différents.');
        } else {
            this.auth.register(this.registerCredentials).subscribe(registered => {
                if (registered) {
                    this.nav.navigateForward('/login', true);
                    this.toastControl('Inscription réussie !');
                } else {
                    this.submitted = false;
                    this.toastControl('Inscription impossible');
                }
            });
        }
    }

    public noSpace() {
        if ((<any>event).keyCode === 32) {
            return false;
        } else {
            return true;
        }
    }

    public connectAccount() {
        this.nav.navigateForward('/login', true);
    }

}
