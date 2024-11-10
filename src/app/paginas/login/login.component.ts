import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterOutlet
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

}
