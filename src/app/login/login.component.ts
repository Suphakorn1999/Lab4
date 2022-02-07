import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName = '';
  passWord = '';
  isDup = false;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {}

  onClick() {
    this.httpClient
      .post(`${environment.API_URL}/auth/login`, {
        userName: this.userName,
        passWord: this.passWord,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.data.loginStatus == 0) {
          Swal.fire({
            title: 'เข้าสู่ระบบสำเร็จ',
            icon: 'success',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://media4.giphy.com/media/mTs11L9uuyGiI/giphy.gif?cid=ecf05e4780c810rtlkj7upjk5x9j79pmq32whyns8ui6t4tb&rid=giphy.gif&ct=s")
                top
                no-repeat`,
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            this.cookie.put('token', res.data.token);
            this.router.navigate(['/landing']);
          }, 3000);
        } else {
          Swal.fire({
            title: 'รหัสไม่ถูกน้าาาาาา!!!',
            icon: 'error',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://media4.giphy.com/media/W0VuY0dTxH9L6vLUJ2/giphy.gif?cid=ecf05e47l5cwu5bljollx0gbw9tr7zggmhhthep85jt6lgbm&rid=giphy.gif&ct=s")
                top
                no-repeat`,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  }
}
