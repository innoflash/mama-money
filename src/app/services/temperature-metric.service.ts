import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TemperatureMetric } from '@mama-money/models/temperature-metric';

@Injectable({
    providedIn: 'root'
})
export class TemperatureMetricService {
    private readonly temperatureMetricSubject$: BehaviorSubject<TemperatureMetric>;
    private readonly temperatureMetric$: Observable<TemperatureMetric>;

    public constructor() {
        this.temperatureMetricSubject$ = new BehaviorSubject<TemperatureMetric>(TemperatureMetric.CELSIUS);
        this.temperatureMetric$ = this.temperatureMetricSubject$.asObservable();
    }

    public onMetricChange(): Observable<TemperatureMetric> {
        return this.temperatureMetric$;
    }

    public setMetric(metric: TemperatureMetric): void {
        return this.temperatureMetricSubject$.next(metric);
    }

    public toggleMetric(): void {
        if (this.temperatureMetricSubject$.value === TemperatureMetric.CELSIUS) {
            return this.setMetric(TemperatureMetric.FAHRENHEIT);
        }

        return this.setMetric(TemperatureMetric.CELSIUS);
    }
}
