import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController, private auth: AuthenticationService, private nav: NavController,
              private navParams: NavParams, private http: HttpClient, private toast: ToastController) { }

    ngOnInit() {
        JsBarcode(this.barcode.nativeElement, this.value.number);
        console.log(this.value);
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

    public deleteCard(_id) {
      _id = this.value._id.toString();
        console.log(this.http.delete(ExempleModalPage.DELETE_CARD + '/' + _id).subscribe());
        /*
        return this.http.delete(ExempleModalPage.DELETE_CARD + '/' + _id).subscribe(res => {
        return res ? this.toastControl('Carte supprimée') : (err) => this.toastControl(err.message);
      });
      */
    }

}
