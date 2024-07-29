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

  private currentSelectedData: IChillSpot = {} as IChillSpot;
  private showModel_ = false;
  private isEditSelection_ = false;

  constructor(private chillSpotService: ChillSpotService) {}

  get rowData(): IChillSpot[] {
    return this.result;
  }

  get cols(): ColDef[] {
    return this.columns;
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

  private getAllChillSpots(): void {
    this.chillSpotService.getAllChillSpots$().subscribe({
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
    this.chillSpotService.getChillSpotById$(id).subscribe({
      next: (chillSpot) => {
        console.log(chillSpot);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  private createChillSpot(chillSpot: IChillSpot): void {
    this.chillSpotService.createChillSpot$(chillSpot).subscribe({
      next: (chillSpot) => {
        console.log(chillSpot);
        this.shouldLoadData$.next(true);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  private updateChillSpot(chillSpot: IChillSpot): void {
    this.chillSpotService.updateChillSpot$(chillSpot).subscribe({
      next: (chillSpot) => {
        console.log(chillSpot);
        this.shouldLoadData$.next(true);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  deleteChillSpot(): void {
    this.chillSpotService
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
  }
}
