import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './authentication.service';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExempleModalPageModule } from './exemple-modal/exemple-modal.module';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

import { Ng2OrderModule } from 'ng2-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ExempleModalPageModule,
      ReactiveFormsModule,
      FilterPipeModule,
      Ng2OrderModule,
      NgbModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
      BarcodeScanner,
      AuthenticationService,
      ToastController,
      NativeStorage,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      NativePageTransitions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
