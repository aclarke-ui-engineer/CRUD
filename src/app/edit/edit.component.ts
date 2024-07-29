import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IChillSpot } from 'server/src/interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() closeModel: () => void = () => {};

  @Input() existingRecords: IChillSpot | undefined;
  @Output() createUpdate: EventEmitter<{
    chillSpot: IChillSpot;
    isEdit: boolean;
  }> = new EventEmitter();

  isEditMode: boolean = false;
  formGroup: FormGroup = null as unknown as FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  handleSubmit() {
    const chillSpot: IChillSpot = {
      id: this.existingRecords?.id!,
      name: this.formGroup.value.name,
      description: this.formGroup.value.description,
      location: this.formGroup.value.location,
      rating: this.formGroup.value.rating,
      entryCost: this.formGroup.value.entryCost,
      establishedSince: this.formGroup.value.establishedSince,
    };

    this.createUpdate.emit({ chillSpot, isEdit: this.isEditMode });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.existingRecords?.name === false ? false : true;

    this.formGroup = this.formBuilder.group({
      name: [this.existingRecords?.name ? this.existingRecords.name : ''],
      location: [
        this.existingRecords?.location ? this.existingRecords.location : '',
      ],
      description: [
        this.existingRecords?.description
          ? this.existingRecords.description
          : '',
      ],
      rating: [this.existingRecords?.rating ? this.existingRecords.rating : ''],
      entryCost: [
        this.existingRecords?.entryCost
          ? this.existingRecords.entryCost
          : false,
      ],
      establishedSince: [
        this.existingRecords?.establishedSince
          ? this.existingRecords.establishedSince
          : '',
      ],
    });
  }

  onMounted(): void {
    !this.existingRecords && this.closeModel();
  }
}
