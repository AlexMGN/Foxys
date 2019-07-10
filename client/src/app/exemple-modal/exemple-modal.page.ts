import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import * as JsBarcode from 'jsbarcode';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-exemple-modal',
  templateUrl: './exemple-modal.page.html',
  styleUrls: ['./exemple-modal.page.scss'],
})
export class ExempleModalPage implements OnInit {

    static readonly DELETE_CARD = 'https://foxyscard.herokuapp.com/cards';

    public value = this.navParams.get('card');

  @ViewChild('barcode') barcode: ElementRef;

  constructor(private modalCtrl: ModalController,
              private auth: AuthenticationService,
              private nav: NavController,
              private navParams: NavParams,
              private http: HttpClient,
              private alert: AlertController,
              private toast: ToastController) {
  }


    ngOnInit() {
        JsBarcode(this.barcode.nativeElement, this.value.number);
    }

    async toastControl (msg: string) {
        const daToast = await this.toast.create({
            message: msg,
            duration: 500,
            position: 'bottom'
        });
        daToast.present();
    }

      async close() {
        await this.modalCtrl.dismiss();
      }

    async deleteCard(_id) {
        const alert = await this.alert.create({
            header: 'Supprimer',
            message: 'Voulez-vous vraiment supprimer la carte ?',
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
                        _id = this.value._id.toString();
                        return this.http.delete(ExempleModalPage.DELETE_CARD + '/' + _id).subscribe(res => {
                            return res ? (this.toastControl('Carte supprimée'), this.close()) : (err) => this.toastControl(err.message);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

}
