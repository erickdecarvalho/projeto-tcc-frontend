import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

export const AUTH_HEADER = 'authorization';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  registerConsumer(signupConsumerRequestDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "consumidores/registrar", signupConsumerRequestDto);
  }

  login(email: String, password: String) {
    return this.http.post(BASIC_URL + "authenticate", { email, password }, { observe: 'response' })
    .pipe(
      map((res: HttpResponse<any>) => {
        console.log(res.body)
        const tokenLength = res.headers.get(AUTH_HEADER)?.length;
        const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
        console.log(bearerToken);
        return res;
      })
    );
  }
}
