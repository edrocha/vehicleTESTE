import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'https://vehicles-api-30nv.onrender.com/vehicles/'; // URL to web API

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any[]> {

    let response = this.http.get<any[]>(this.apiUrl+'/all');
    return response
  }

  addVehicle(vehicle: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/create', vehicle);
  }

  updateVehicle(vehicle: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${vehicle.id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
