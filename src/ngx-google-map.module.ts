import { NgxGoogleMapComponent } from './components/ngx-google-map/ngx-google-maps.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgxGoogleMapComponent],
  imports: [CommonModule],
  exports: [NgxGoogleMapComponent],
  providers: [],
  bootstrap: []
})
export class NgxGoogleMapModule { }
