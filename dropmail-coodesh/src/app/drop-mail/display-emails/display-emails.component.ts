import { Component, OnInit } from '@angular/core';
import { DropMailService } from 'src/app/dropMail.service';
import { Mails } from '../shared/mails.model';

@Component({
  selector: 'app-display-emails',
  templateUrl: './display-emails.component.html',
  styleUrls: ['./display-emails.component.scss']
})
export class DisplayEmailsComponent implements OnInit {
  id: any = null
  item: Mails = { downloadUrl: "", fromAddr: "", headerSubject: "", rawSize: -1, subtext: "", text: "", toAddr: "" }
  mails: Mails[] = [{ downloadUrl: "", fromAddr: "", headerSubject: "Caixa de entrada Vazia...", rawSize: -1, subtext: "", text: "", toAddr: "" }]
  seconds: number = 15

  constructor(private dropMailService: DropMailService) { }

  ngOnInit() {
    this.getEmails()
  }

  setItem(item: any) {
    if (item.rawSize > 0)
      this.item = item
  }

  getEmails() {
    this.id = sessionStorage.getItem("id")
    this.dropMailService.getEmails(this.id).subscribe(res => {
      this.mails = res.data.session.mails.length > 0 ? res.data.session.mails : [{ downloadUrl: "", fromAddr: "", headerSubject: "Caixa de entrada Vazia...", rawSize: -1, subtext: "", text: "", toAddr: "" }]
      this.timer()
    })
  }

  timer() {
    this.seconds = 15
    let intervalId = setInterval(() => {
      this.seconds -= 1

      if (this.seconds === 0) {
        this.getEmails()
        clearInterval(intervalId)
      }
    }, 1000)
  }

  download() {
    window.open(this.item.downloadUrl, '_blank');
  }

}