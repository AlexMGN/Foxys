import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import { AddCardPage } from './add-card.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


const routes: Routes = [
    {
        path: '',
        component: AddCardPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AddCardPage],
    providers: [
        BarcodeScanner,
    ]
})
export class AddCardPageModule {}
