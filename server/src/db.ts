import { IChillSpot } from './interface';

export class Database {
  private chillSpots: IChillSpot[] = [];
  private static currentChillSpotId = 1;
  private static instance: Database;

  private constructor() {
    this.initializeChillSpotData();
  }

  private returnWithPromiseResolve<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  }

  private returnWithPromiseReject<T>(data: T): Promise<T> {
    return new Promise((_resolve, reject) => {
      setTimeout(() => reject(data), 1000);
    });
  }

  public static getNewChillSpotId(): string {
    return String(this.currentChillSpotId++);
  }

  private initializeChillSpotData(): void {
    this.chillSpots = [
      {
        id: '1',
        name: 'Sunny Beach',
        location: 'California',
        description: 'A beautiful sunny beach perfect for family outings.',
        rating: 4.5,
        entryCost: false,
        establishedSince: '1950',
      },
      {
        id: '2',
        name: 'Mountain Retreat',
        location: 'Colorado',
        description: 'A serene mountain retreat with breathtaking views.',
        rating: 4.8,
        entryCost: true,
        establishedSince: '1975',
      },
      {
        id: '3',
        name: 'City Park',
        location: 'New York',
        description:
          'A spacious park in the heart of the city, great for picnics and walks.',
        rating: 4.2,
        entryCost: false,
        establishedSince: '1980',
      },
      {
        id: '4',
        name: 'Desert Oasis',
        location: 'Nevada',
        description: 'An oasis in the desert offering a unique experience.',
        rating: 4.7,
        entryCost: true,
        establishedSince: '1960',
      },
      {
        id: '5',
        name: 'Lakeview Camp',
        location: 'Michigan',
        description: 'A camp by the lake, perfect for fishing and camping.',
        rating: 4.3,
        entryCost: false,
        establishedSince: '1990',
      },
    ];
  }

  public static getInstance(): Database {
    if (!this.instance) Database.instance = new Database();
    return Database.instance;
  }

  public getChillSpots(): Promise<IChillSpot[]> {
    return this.chillSpots.length > 0
      ? this.returnWithPromiseResolve(this.chillSpots)
      : this.returnWithPromiseReject([]);
  }

  public getChillSpotById(id: string): Promise<IChillSpot | undefined> {
    const chillSpot = this.chillSpots.find((chillSpot) => chillSpot.id === id);
    return chillSpot
      ? this.returnWithPromiseResolve(chillSpot)
      : this.returnWithPromiseReject(undefined);
  }

  public createChillSpot(chillSpot: IChillSpot): Promise<boolean> {
    this.chillSpots.push(chillSpot);
    return this.returnWithPromiseResolve(true);
  }

  public editChillSpotById(
    id: string,
    chillSpot: IChillSpot
  ): Promise<boolean> {
    const index = this.chillSpots.findIndex((chillSpot) => chillSpot.id === id);
    this.chillSpots[index] = chillSpot;
    return this.returnWithPromiseResolve(true);
  }

  public deleteChillSpotById(id: string): Promise<boolean> {
    let wasDeleted = false;
    this.chillSpots = this.chillSpots.filter((chillSpot) => {
      if (chillSpot.id === id) {
        wasDeleted = true;
        return false;
      }
      return true;
    });
    return wasDeleted
      ? this.returnWithPromiseResolve(true)
      : this.returnWithPromiseReject(false);
  }
}

export default Database.getInstance();
