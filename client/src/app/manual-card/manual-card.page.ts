import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Shop } from '../interface/shop';
import * as _ from 'lodash'; // Sort method



@Component({
  selector: 'app-manual-card',
  templateUrl: './manual-card.page.html',
  styleUrls: ['./manual-card.page.scss'],
})
export class ManualCardPage implements OnInit {

    scannedData: {};

    afterScan = false;

    shops: Shop[];

    cardCredentials = { name: '', number: '' };

    searchTerm;

    constructor(public nav: NavController,
                private auth: AuthenticationService,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private toast: ToastController,
                private scan: BarcodeScanner) {
    }


  ngOnInit() {
      this.auth.getShops()
          .subscribe((data: Shop[]) => {
                  this.shops = _.sortBy(data, 'name');
              },
              (err) => {
                  this.nav.navigateBack('/login', true);
                  this.toastControl(err);
              });
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

    async scanBarcode(name) {
        this.cardCredentials.name = name;
        this.scan.scan().then((barcodeData: any) => {
            this.scannedData = barcodeData;
            this.cardCredentials.number = barcodeData.text;
            this.afterScan = true;
        }).catch(err => {
            this.afterScan = false;
            console.log('Error', err);
        });
    }

    setFilteredItems() {
        this.auth.getShops()
            .subscribe((data: Shop[]) => {
                    data = this.filterItems(this.searchTerm);
                    return data;
                },
                (err) => {
                    this.nav.navigateBack('/login', true);
                    this.toastControl(err);
                });
    }

    filterItems(searchTerm) {
        this.auth.getShops()
            .subscribe((data: Shop[]) => {
                this.shops = data.filter(shop => {
                    console.log(shop.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                    try {
                        return shop.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    } catch (e) {
                        return '';
                    }
                });
            });
        return this.shops;
    }

}
