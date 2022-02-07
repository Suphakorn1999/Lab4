import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userName = '';
  passWord = '';
  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onRegister() {
    this.httpClient
      .post(`${environment.API_URL}/user/register`, {
        userName: this.userName,
        passWord: this.passWord,
      })
      .subscribe((res: any) => {
        if (res.data == 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'ลงทะเบียนผิดพลาด',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'ลงทะเบียนสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
             this.router.navigate(['/login']);
          }, 1500);
        }
      });
  }
}
