import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NoteComponent,
  },
];

@NgModule({
  declarations: [NoteComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NoteModule {}
