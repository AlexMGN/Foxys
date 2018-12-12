import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerCredentials = { username: '', email: '', password: '', confirmPass: '' };

    registerForm: FormGroup;
    submitted = false;

  constructor(private auth: AuthenticationService,
              public nav: NavController,
              private toast: ToastController,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPass: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get f() { return this.registerForm.controls; }

    async toastControl (msg: string) {
        const daToast = await this.toast.create({
            message: msg,
            duration: 5000,
            position: 'bottom',
        });
        daToast.present();
    }

    public register() {
      this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        } else if (this.registerCredentials.password !== this.registerCredentials.confirmPass) {
            this.toastControl('Les deux mots de passes sont différentes');
        } else {
            this.auth.register(this.registerCredentials).subscribe(registered => {
                if (registered) {
                    this.nav.navigateRoot('/login');
                    this.toastControl('Inscription réussie !');
                } else {
                    this.submitted = false;
                    this.toastControl('Inscription impossible');
                }
            });
        }
    }

    public noSpace() {
        if ((<any>event).keyCode === 32) {
            return false;
        } else {
            return true;
        }
    }

    public connectAccount() {
        this.nav.navigateRoot('/login');
    }

}
