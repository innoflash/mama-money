import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnitService } from '@mama-money/services/temperature-unit.service';
import { map, Observable } from 'rxjs';
import { TemperatureUnit } from '@mama-money/models/temperature-unit';

@Pipe({
    name: 'temperatureUnit'
})
export class TemperatureUnitPipe implements PipeTransform {

    public constructor(private readonly temperatureUnitService: TemperatureUnitService) {
    }

    public transform(value: number): Observable<string> {
        return this.temperatureUnitService.onUnitChange().pipe(
            map(unit => {
                const temperature = unit === TemperatureUnit.CELSIUS
                    ? value
                    : (value * 9 / 5) + 32;

                return `${ Math.ceil(temperature) }°${ unit }`;
            })
        );
    }
}
