import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChillSpotService } from '../services/chill-spot.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IChillSpot } from 'server/src/interface';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-chill-spot',
  templateUrl: './chill-spot.component.html',
  styleUrls: ['./chill-spot.component.scss'],
})
export class ChillSpotComponent implements OnInit, OnDestroy {
  private shouldLoadData$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private shouldLoadDataSubscription: Subscription = new Subscription();

  private result: IChillSpot[] = [];
  private columns: ColDef[] = [];
  private defaultColumns: ColDef = {
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
  };

  private currentSelectedData: IChillSpot = {} as IChillSpot;

  private showModel_ = false;
  private isEditSelection_ = false;
  private isLoading_ = false;

  private getAllChillSpotsSubscription: Subscription =
    null as unknown as Subscription;
  private getChillSpotByIdSubscription: Subscription =
    null as unknown as Subscription;
  private createChillSpotSubscription: Subscription =
    null as unknown as Subscription;
  private updateChillSpotSubscription: Subscription =
    null as unknown as Subscription;
  private deleteChillSpotSubscription: Subscription =
    null as unknown as Subscription;

  constructor(private chillSpotService: ChillSpotService) {}

  get rowData(): IChillSpot[] {
    return this.result;
  }

  get cols(): ColDef[] {
    return this.columns;
  }

  get defaultCol(): ColDef {
    return this.defaultColumns;
  }

  get data(): IChillSpot {
    return this.currentSelectedData;
  }

  get showModel(): boolean {
    return this.showModel_;
  }

  get isEditSelection(): boolean {
    return this.isEditSelection_;
  }

  get isLoading(): boolean {
    return this.isLoading_;
  }

  private set isLoading(value: boolean) {
    this.isLoading_ = value;
  }

  private getAllChillSpots(): void {
    this.getAllChillSpotsSubscription = this.chillSpotService
      .getAllChillSpots$()
      .subscribe({
        next: (chillSpots) => {
          this.result = chillSpots;
          this.columns = Object.keys(chillSpots[0]).map((key) => ({
            field: key,
            checkboxSelection: key === 'id' ? true : false,
          }));
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete');
          this.currentSelectedData = {} as IChillSpot;
        },
      });
  }

  private getChillSpotById(id: string): void {
    this.isLoading = true;
    this.getChillSpotByIdSubscription = this.chillSpotService
      .getChillSpotById$(id)
      .subscribe({
        next: (chillSpot) => {
          console.log(chillSpot);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete');
          this.isLoading = false;
        },
      });
  }

  private createChillSpot(chillSpot: IChillSpot): void {
    this.isLoading = true;
    this.createChillSpotSubscription = this.chillSpotService
      .createChillSpot$(chillSpot)
      .subscribe({
        next: (chillSpot) => {
          console.log(chillSpot);
          this.shouldLoadData$.next(true);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete');
          this.isLoading = false;
        },
      });
  }

  private updateChillSpot(chillSpot: IChillSpot): void {
    this.isLoading = true;
    this.updateChillSpotSubscription = this.chillSpotService
      .updateChillSpot$(chillSpot)
      .subscribe({
        next: (chillSpot) => {
          console.log(chillSpot);
          this.shouldLoadData$.next(true);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('complete');
          this.isLoading = false;
        },
      });
  }

  deleteChillSpot(): void {
    this.isLoading = true;
    this.deleteChillSpotSubscription = this.chillSpotService
      .deleteChillSpot$(this.currentSelectedData.id)
      .subscribe({
        next: (chillSpot) => {
          console.log(chillSpot);
          this.shouldLoadData$.next(true);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('completed');
          this.isLoading = false;
        },
      });
  }

  handleCreateDeleteEvent(value: any) {
    const { chillSpot, isEdit } = value;
    isEdit ? this.updateChillSpot(chillSpot) : this.createChillSpot(chillSpot);
  }

  handleIsEditSelection(isEdit: boolean) {
    this.isEditSelection_ = isEdit;
    this.showModel_ = true;
  }

  openModel() {
    this.showModel_ = true;
  }

  closeModel() {
    this.showModel_ = false;
  }

  setSelectedRowData(event: any) {
    if (event.node.selected) this.currentSelectedData = event.data;
    else if (!event.node.selected) this.currentSelectedData = {} as IChillSpot;
  }

  ngOnInit(): void {
    this.shouldLoadDataSubscription = this.shouldLoadData$.subscribe(
      (shouldLoadData) => {
        if (shouldLoadData) this.getAllChillSpots();
      }
    );
  }

  ngOnDestroy(): void {
    this.shouldLoadDataSubscription.unsubscribe();
    this.getAllChillSpotsSubscription.unsubscribe();
    this.getChillSpotByIdSubscription.unsubscribe();
    this.createChillSpotSubscription.unsubscribe();
    this.updateChillSpotSubscription.unsubscribe();
    this.deleteChillSpotSubscription.unsubscribe();
  }
}
