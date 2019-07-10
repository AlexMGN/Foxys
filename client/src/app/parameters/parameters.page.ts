import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {AuthenticationService} from '../authentication.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../interface/user';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss'],
})
export class ParametersPage implements OnInit {

    user: User[];

    constructor(private nav: NavController,
                private auth: AuthenticationService,
                private alert: AlertController,
                public http: HttpClient,
                private modalCtrl: ModalController,
    ) {
    }

    ngOnInit() {
        this.auth.getAccount()
            .subscribe((data: User[]) => {
                    this.user = data;
                },
                (err) => {
                    this.nav.navigateBack('/login', true);
                });
    }

    async logout() {
        const alert = await this.alert.create({
            header: 'Déconnexion',
            message: 'Voulez-vous vraiment vous déconnecter ?',
            buttons: [
                {
                    text: 'Non',
                    role: 'non',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Welcome back !');
                    }
                }, {
                    text: 'Oui',
                    handler: () => {
                        this.nav.navigateBack('/start', true);
                    }
                }
            ]
        });

        await alert.present();
    }

    cardPage() {
        this.nav.navigateBack('/home', true);
    }

    setting() {
        this.nav.navigateForward('/parameters');
    }

    addCard() {
        this.nav.navigateBack('/manualCard', true);
    }

}
