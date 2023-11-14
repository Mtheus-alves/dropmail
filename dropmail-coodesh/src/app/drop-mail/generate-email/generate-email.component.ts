import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DropMailService } from 'src/app/dropMail.service';
import { GeneratedEmail } from '../shared/generated-email.model';

@Component({
  selector: 'app-generate-email',
  templateUrl: './generate-email.component.html',
  styleUrls: ['./generate-email.component.scss']
})
export class GenerateEmailComponent implements OnInit {
  @Output() showEmails: EventEmitter<boolean> = new EventEmitter()

  generatedEmail: GeneratedEmail = { address: "", expiresAt: "", id: "" }
  showInfoEmail: boolean = false
  textCopy: string = "Copiar"

  constructor(private dropMailService: DropMailService) { }

  ngOnInit() {
    this.showInfoEmail = sessionStorage.getItem("id") != null
    this.showEmails.emit(this.showInfoEmail)
    if (this.showInfoEmail)
      this.getSessionStorage()
  }

  clipboard() {
    navigator.clipboard.writeText(this.generatedEmail.address);
    this.textCopy = "Copiado!"
  }


  generateEmail() {
    this.dropMailService.generateEmail().subscribe(res => {
      this.generatedEmail = {
        address: res.data.introduceSession.addresses[0].address,
        expiresAt: res.data.introduceSession.expiresAt,
        id: res.data.introduceSession.id
      }
      this.setSessionStorage()
      this.showInfoEmail = sessionStorage.getItem("id") != null && sessionStorage.getItem("address") != null
      this.showEmails.emit(this.showInfoEmail)
    })
  }

  getSessionStorage() {
    this.generatedEmail = {
      address: sessionStorage.getItem("address") || "",
      id: sessionStorage.getItem("id") || "",
      expiresAt: sessionStorage.getItem("expiresAt") || "",
    }
  }

  setSessionStorage() {
    sessionStorage.setItem("id", this.generatedEmail.id);
    sessionStorage.setItem("expiresAt", this.generatedEmail.expiresAt);
    sessionStorage.setItem("address", this.generatedEmail.address);
  }

  notification() {
    if (Notification.permission == "denied" || Notification.permission == "default") {
      Notification.requestPermission()
    }
  }

}
