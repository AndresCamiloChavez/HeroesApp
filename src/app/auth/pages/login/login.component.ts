import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  login(){  
    this.authService.login().subscribe(dataUser =>{
      if(dataUser.id){
        this.router.navigate(['./heroes']);
      }
    });
  }
  ingresarSinLogin(){
    this.router.navigate(['./heroes']);
  }
}
