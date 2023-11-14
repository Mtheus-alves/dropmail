import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropMailComponent } from './drop-mail.component';
import { GenerateEmailComponent } from './generate-email/generate-email.component';
import { DisplayEmailsComponent } from './display-emails/display-emails.component';
import { ButtonModule } from 'primeng/button';
import {VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    VirtualScrollerModule,
    InputTextModule,
    FormsModule,
    TooltipModule
  ],
  declarations: [
    DropMailComponent,
    GenerateEmailComponent,
    DisplayEmailsComponent,
  ]
})
export class DropMailModule { }
