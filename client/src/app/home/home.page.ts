import {Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Cards } from '../interface/cards';
import { ExempleModalPage } from '../exemple-modal/exemple-modal.page';


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
        this.doRefresh(0);
        this.auth.getAccount()
            .subscribe((data: User[]) => {
                    this.user = data;
                },
                (err) => {
                    this.nav.navigateBack('/login', true);
                });
    }

    public addCard() {
        this.nav.navigateRoot('/manualCard');
    }

    async showCard(card) {
        const modal = await this.modalCtrl.create({
            component: ExempleModalPage,
            componentProps: {
                'card' : card
            }
        });

        modal.onDidDismiss().then(() => {
            this.doRefresh(0);
        });

        await modal.present();
    }

    doRefresh(event) {
        console.log('Refreshing...');

        setTimeout(() => {
            this.auth.getCards()
                .subscribe((data: Cards[]) => {
                        console.log(data);
                        this.cards = data;
                    },
                    (err) => {
                        this.nav.navigateRoot('/home');
                    });
            if (event !== 0) {
                event.target.complete();
            }
        }, 1000);
    }

    cardPage() {
        this.nav.navigateRoot('/home');
    }

    setting() {
        this.nav.navigateForward('/parameters');
    }
}
