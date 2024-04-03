import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleserviceService {
  constructor(private http: HttpClient) {}

  getPlaceName(latitude: number, longitude: number): Observable<string> {
    const API_KEY = 'AIzaSyAoUo0-J9X1J7Dv08pnGwigpu2Jw_KAr8k'; 
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

    return this.http.get<any>(apiUrl).pipe(
      map((response: any) => {
        if (response && response.results && response.results.length > 0) {
          return response.results[0].formatted_address;
        } else {
          throw new Error('No results found');
        }
      }),
      catchError((error: any) => {
        throw new Error('Error fetching place name: ' + JSON.stringify(error));
      })
    );
  }
}
