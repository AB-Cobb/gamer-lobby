import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  msg: string = '';
  constructor(private fb: FormBuilder, public authService: AuthService, public router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required],
  })

  loginFormSubmit(){

  }

}
