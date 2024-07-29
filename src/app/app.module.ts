import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChillSpotComponent } from './chill-spot/chill-spot.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModalComponent } from './modal/modal.component';
import { ControlsComponent } from './controls/controls.component';
import { EditComponent } from './edit/edit.component';
import { RemoveComponent } from './remove/remove.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChillSpotComponent,
    ModalComponent,
    ControlsComponent,
    EditComponent,
    RemoveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
