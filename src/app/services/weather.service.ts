import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';
import { PlaceDetailModel } from '@mama-money/models/place-detail.model';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    public constructor(private readonly http: HttpClient) {
    }

    public geocodeLocation(city: string = 'Cape Town'): Observable<PlaceDetailModel> {
        return this.http.get<PlaceDetailModel[]>(`${ environment.apiUrls.geocoding }/direct`, {
            params: {
                q: city,
                limit: 5
            }
        }).pipe(map(res => res[0]));
    }
}
