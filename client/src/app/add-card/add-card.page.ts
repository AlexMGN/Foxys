import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { AuthenticationService } from '../authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.page.html',
    styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

    result: BarcodeScanResult;
    cardCredentials = { number: '', name: '' };

    constructor(private nav: NavController,
                private auth: AuthenticationService,
                private scan: BarcodeScanner,
                private toast: ToastController) {
    }

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

    public backToHome() {
        this.nav.navigateRoot('/home');
    }

    public addManual() {
      this.nav.navigateRoot('/manualCard');
    }

    async scanBarcode() {
        try {

            const options: BarcodeScannerOptions = {
                prompt: 'Scannez le code barre',
                torchOn: true
            }

            this.result = await this.scan.scan(options);
        } catch (e) {
            console.log(e);
        }
    }

    public add() {
        this.auth.add(this.cardCredentials).subscribe(add => {
            if (add) {
                this.nav.navigateRoot('/home');
                this.toastControl('Carte ajoutée avec succès');
            } else {
                this.nav.navigateRoot('/manual');
                this.toastControl('Veuillez vérifier la carte');
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
