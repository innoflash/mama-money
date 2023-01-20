import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TemperatureUnit } from '@mama-money/models/temperature-unit';

@Injectable({
    providedIn: 'root'
})
export class TemperatureUnitService {
    private readonly temperatureUnitSubject$: BehaviorSubject<TemperatureUnit>;
    private readonly temperatureUnit$: Observable<TemperatureUnit>;

    public constructor() {
        this.temperatureUnitSubject$ = new BehaviorSubject<TemperatureUnit>(TemperatureUnit.CELSIUS);
        this.temperatureUnit$ = this.temperatureUnitSubject$.asObservable();
    }

    public onUnitChange(): Observable<TemperatureUnit> {
        return this.temperatureUnit$;
    }

    public setMetric(metric: TemperatureUnit): void {
        return this.temperatureUnitSubject$.next(metric);
    }

    public toggleMetric(): void {
        if (this.temperatureUnitSubject$.value === TemperatureUnit.CELSIUS) {
            return this.setMetric(TemperatureUnit.FAHRENHEIT);
        }

        return this.setMetric(TemperatureUnit.CELSIUS);
    }
}
