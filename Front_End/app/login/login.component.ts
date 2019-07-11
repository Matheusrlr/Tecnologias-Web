import { Component, NgZone,OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: 'Joao';
  senha: '123';

  ngOnInit() {
  }

  constructor(private loginService: LoginService, private router: Router, private ngZone: NgZone) {
  }

  login1() {
    this.loginService.login(this.login, this.senha).subscribe(
      user => {
        if (user.token) {
          localStorage.setItem('TOKEN', user.token);
          localStorage.setItem('TIPO', user.tipo);

          if ( user.tipo == 'empresa' ) {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/empresas');
            });
          } else {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/home');
            });
          }
        }
      }, r => {
        alert("Login ou senha inválidos.");

      });
  }
}
