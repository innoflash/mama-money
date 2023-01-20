import { Component, Input } from '@angular/core';
import { WeatherDetailModel } from '@mama-money/models/weather.models';

@Component({
    selector: 'app-hourly-weather-body',
    templateUrl: './hourly-weather-body.component.html',
    styles: []
})
export class HourlyWeatherBodyComponent {
    @Input() public weather!: WeatherDetailModel;
}
