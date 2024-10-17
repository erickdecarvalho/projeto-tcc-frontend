import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  postApi(apiDTO: any): Observable<any> {
    const providerId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + `provedores/api/${providerId}`, apiDTO, {
      headers : this.createAuthorizationHeader()
    })
  }

  getAllApisByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `provedores/apis/${userId}`, {
      headers : this.createAuthorizationHeader()
    })
  }

  addEndpointToApi(endpointId: string, endpointDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + `apis/endpoint/${endpointId}`, endpointDTO, {
      headers : this.createAuthorizationHeader()
    })
  }

  updateEndpointById(apiId: string, endpointDTO: any): Observable<any> {
    return this.http.put(BASIC_URL + `apis/endpoint/${apiId}`, endpointDTO, {
      headers : this.createAuthorizationHeader()
    })
  }

  addParameterToEndpoint(endpointId: string, parameterDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + `apis/endpoint/${endpointId}/parameter`, parameterDTO, {
      headers : this.createAuthorizationHeader()
    })
  }

  deleteParameterById(parameterId: string): Observable<any> {
  return this.http.delete(BASIC_URL + `apis/endpoint/parameter/${parameterId}`, {
    headers : this.createAuthorizationHeader()
  });
  }


  deleteEndpointById(endpointId: string): Observable<any> {
    return this.http.delete(BASIC_URL + `apis/endpoint/${endpointId}`, {
      headers : this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }

}
