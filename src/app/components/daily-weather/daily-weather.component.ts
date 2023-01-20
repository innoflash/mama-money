import { Component, Input } from '@angular/core';
import { DailyWeatherModel } from '@mama-money/models/weather.models';

@Component({
    selector: 'app-daily-weather',
    templateUrl: './daily-weather.component.html',
    styles: []
})
export class DailyWeatherComponent {
    @Input() public weather!: DailyWeatherModel;
}
