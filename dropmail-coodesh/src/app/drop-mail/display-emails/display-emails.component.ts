import { Component, OnInit } from '@angular/core';
import { DropMailService } from 'src/app/dropMail.service';
import { Mails } from '../shared/mails.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-display-emails',
  templateUrl: './display-emails.component.html',
  styleUrls: ['./display-emails.component.scss']
})
export class DisplayEmailsComponent implements OnInit {
  id: any = null
  item: any = { downloadUrl: "", fromAddr: "", headerSubject: "", rawSize: -1, subtext: "", text: "", toAddr: "" }
  mails: Mails[] = []
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

    if (this.id == null)
      return

    this.dropMailService.getEmails(this.id).subscribe(res => {
      if (this.mails.length != res.data.session.mails.length)
        new Notification(`Você tem ${res.data.session.mails.length - this.mails.length} novo(s) email(s)!`);

      this.mails = res.data.session.mails

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
