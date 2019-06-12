import {Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Cards } from '../interface/cards';
import {ExempleModalPage} from '../exemple-modal/exemple-modal.page';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    cards: Cards[];
    user: User[];



    constructor(private nav: NavController,
                private auth: AuthenticationService,
                private alert: AlertController,
                public http: HttpClient,
                private modalCtrl: ModalController,
                ) {
    }

    ngOnInit() {
        this.auth.getCards()
            .subscribe((data: Cards[]) => {
                    console.log(data);
                    this.cards = data;
                },
                (err) => {
                    this.nav.navigateRoot('/home');
                });
        this.auth.getAccount()
            .subscribe((data: User[]) => {
                    this.user = data;
                },
                (err) => {
                    this.nav.navigateRoot('/login');
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
                        this.nav.navigateRoot('/login');
                    }
                }
            ]
        });

        await alert.present();
    }

    public addCard() {
        this.nav.navigateRoot('/manualCard');
    }

    async showCard(card) {
        console.log(card);
        const modal = await this.modalCtrl.create({
            component: ExempleModalPage,
            componentProps: {
                'card' : card
            }
        });
        await modal.present();
    }
}
