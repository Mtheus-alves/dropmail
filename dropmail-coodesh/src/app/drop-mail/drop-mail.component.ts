import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-mail',
  templateUrl: './drop-mail.component.html',
  styleUrls: ['./drop-mail.component.scss']
})
export class DropMailComponent implements OnInit {
  showEmails:boolean = false

  constructor() { }

  ngOnInit() {
  }
}
