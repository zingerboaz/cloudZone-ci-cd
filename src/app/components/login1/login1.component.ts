import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component {
  errors: any;
  login = {
    email: "",
    password: "",
  }
  constructor(private serverService: ServerService, private tokenService: TokenService, private router: Router) { }

  getlogin() {
      this.serverService.createToken(this.login).subscribe(data => {
        console.log(data)
        if (data && data.token) this.tokenService.setUser(data);
        localStorage.setItem("token", data.token);
        this.router.navigate(["/app-practises"]);
      }, err => {
        console.log('err', err);
        if (err) {
          // Incorrect password
          this.errors = "Incorrect password. Please try again!";
          return;
        }
      })
  }

}
