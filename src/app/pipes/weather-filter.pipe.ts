import { Pipe, PipeTransform } from '@angular/core';
import { WeatherDetailModel } from '@mama-money/models/weather.models';
import * as moment from 'moment';

@Pipe({
    name: 'weatherFilter'
})
export class WeatherFilterPipe implements PipeTransform {

    public transform(weatherModels: WeatherDetailModel[]): WeatherDetailModel[] {
        return weatherModels.filter(weather => {
            return moment(weather.dt, 'X').isBefore(
                moment().add(1, 'day').startOf('day')
            );
        });
    }
}
