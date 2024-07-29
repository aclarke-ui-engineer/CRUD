import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChillSpot } from 'server/src/interface';

@Injectable({
  providedIn: 'root',
})
export class ChillSpotService {
  private endpoint: string = '';

  constructor(private http: HttpClient) {
    this.endpoint = 'http://localhost:4001/api/chill-spot';
  }

  getAllChillSpots$(): Observable<IChillSpot[]> {
    return this.http.get<IChillSpot[]>(this.endpoint);
  }

  getChillSpotById$(id: string): Observable<IChillSpot> {
    return this.http.get<IChillSpot>(`${this.endpoint}/${id}`);
  }

  createChillSpot$(chillSpot: IChillSpot): Observable<IChillSpot> {
    return this.http.post<IChillSpot>(this.endpoint, chillSpot);
  }

  updateChillSpot$(chillSpot: IChillSpot): Observable<IChillSpot> {
    return this.http.patch<IChillSpot>(
      `${this.endpoint}/${chillSpot.id}`,
      chillSpot
    );
  }

  deleteChillSpot$(id: string): Observable<IChillSpot> {
    return this.http.delete<IChillSpot>(`${this.endpoint}/${id}`);
  }
}
