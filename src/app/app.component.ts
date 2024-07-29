import { Component } from '@angular/core';
import { IChillSpot } from 'server/src/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private footerMessage_: string = '© 2025 Chill Spot';
  private currentSelectedData: IChillSpot = {} as IChillSpot;
  private showModel_ = false;
  private isEditSelection_ = false;

  constructor() {}

  get selectedData(): IChillSpot {
    return this.currentSelectedData;
  }

  get footerMessage(): string {
    return this.footerMessage_;
  }

  get showModel(): boolean {
    return this.showModel_;
  }

  get isEditSelection(): boolean {
    return this.isEditSelection_;
  }

  handleIsEditSelection(isEdit: boolean) {
    this.isEditSelection_ = isEdit;
    this.showModel_ = true;
  }

  closeModel() {
    this.showModel_ = false;
  }

  handleSelectedData(data: any) {
    this.currentSelectedData = data;
  }
}
