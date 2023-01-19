import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, Observable, retry, timer } from 'rxjs';
import { PlaceDetailModel } from '@mama-money/models/place-detail.model';
import { WeatherResponse } from '@mama-money/models/weather.models';

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

    public getLocationWeather(place: PlaceDetailModel): Observable<WeatherResponse> {
        return this.http.get<WeatherResponse>(`${ environment.apiUrls.weather }/onecall`, {
            params: {
                lat: place.lat,
                lon: place.lon,
                exclude: 'alerts',
                units: 'metric'
            }
        }).pipe(
            retry({
                delay: (error, retryCount) => timer(Math.pow(retryCount, 2) * 1000)
            })
        );
    }
}
