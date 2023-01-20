import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

    public transform(value: string): string {
        return `http://openweathermap.org/img/wn/${ value }@2x.png`;
    }
}
