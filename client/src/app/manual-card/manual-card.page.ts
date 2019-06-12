import {Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-manual-card',
  templateUrl: './manual-card.page.html',
  styleUrls: ['./manual-card.page.scss'],
})
export class ManualCardPage implements OnInit {

    scannedData: {};

    cardCredentials = { name: '', number: '' };


    constructor(public nav: NavController,
                private auth: AuthenticationService,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private toast: ToastController,
                private scan: BarcodeScanner) {
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

  public add() {
        this.auth.add(this.cardCredentials).subscribe(add => {
            console.log(this.cardCredentials);
            if (this.cardCredentials.name.length < 3) {
                this.toastControl('Erreur avec l\'ajout de la carte');
            } else if (add) {
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

    public backToHome() {
        this.nav.navigateRoot('/home');
    }

    async scanBarcode() {
        this.scan.scan().then((barcodeData: any) => {
            this.scannedData = barcodeData;
            this.cardCredentials.number = barcodeData.text;
        }).catch(err => {
            console.log('Error', err);
        });
    }

}
