import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @Output() openModel: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  openEditModal() {
    this.openModel.emit(true);
  }

  openRemoveModal() {
    this.openModel.emit(false);
  }
}
