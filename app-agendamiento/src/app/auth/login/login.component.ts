import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string = null;
  password: string = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  validarFormulario(): void {
    console.log(this.username);
    console.log(this.password);
    this.login();
  }


  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log(response);
      }, err => {
        console.log(err);
      }
    );
  }


}
