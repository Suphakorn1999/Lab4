import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  productList=[]
  constructor(private httpClient: HttpClient, private cookie: CookieService) {}

  ngOnInit(): void {
    this.httpClient
      .post(
        `${environment.API_URL}/product/list`,
        {},
        { headers: { Authorization: `Bearer ${this.cookie.get('token')}` } }
      )
      .subscribe((res: any) => {
        console.log(res);
        this.productList = res.data;
      });
  }
}
