import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss'],
})
export class RemoveComponent implements OnInit {
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  handleRemove() {
    this.delete.emit();
  }

  ngOnInit(): void {}
}
