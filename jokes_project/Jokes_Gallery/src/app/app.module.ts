import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { JokeDetailsModalComponent } from './joke-details-modal/joke-details-modal.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'GalleryJokes',
    component: GalleryComponent
  }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, GalleryComponent, JokeDetailsModalComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule, HttpClientModule, MatDialogModule],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {}
