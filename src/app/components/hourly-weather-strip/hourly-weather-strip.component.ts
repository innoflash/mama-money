import { Component, Input } from '@angular/core';
import { WeatherDetailModel } from '@mama-money/models/weather.models';

@Component({
    selector: 'app-hourly-weather-strip',
    templateUrl: './hourly-weather-strip.component.html',
    styles: []
})
export class HourlyWeatherStripComponent {
    @Input() public weather!: WeatherDetailModel;
}