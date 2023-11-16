import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropMailService {
  url: string = 'https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/matheus123'

  constructor(private http: HttpClient) { }

  generateEmail(): Observable<any> {
    var body = { query: "mutation {introduceSession {id, expiresAt, addresses {address}}}" }
    return (this.http.post(this.url, body));
  }

  getEmails(id: string): Observable<any> {
    var body = { query: "query ($id: ID!) {session(id:$id) { addresses {address}, mails{rawSize, fromAddr, toAddr, downloadUrl, text, headerSubject}} }", "variables": { "id": id } }
    return (this.http.post(this.url, body));
  }


}
