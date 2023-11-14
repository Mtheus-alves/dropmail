import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropMailComponent } from './drop-mail/drop-mail.component';

const routes: Routes = [
  { path: '', redirectTo: 'dropmail', pathMatch: 'full' },
  { path: 'dropmail', component: DropMailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }