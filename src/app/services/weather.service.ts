import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    public constructor(private readonly http: HttpClient) {
    }

    public geocodeLocation(city: string = 'Cape Town') {
        return this.http.get(`${ environment.apiUrls.geocoding }/direct`, {
            params: {
                q: city,
                limit: 5
            }
        });
    }
}
