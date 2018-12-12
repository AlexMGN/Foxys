import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { AlertController } from '@ionic/angular';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    users;

    constructor(private nav: NavController,
                private auth: AuthenticationService,
                private alert: AlertController) {
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
        this.nav.navigateRoot('/addCard');
    }
}
