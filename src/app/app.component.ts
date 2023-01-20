import { Component, OnDestroy } from '@angular/core';
import { interval, merge, Observable, shareReplay, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { WeatherService } from '@mama-money/services/weather.service';
import { PlaceDetailModel } from '@mama-money/models/place-detail.model';
import { WeatherResponse } from '@mama-money/models/weather.models';
import { TemperatureUnitService } from '@mama-money/services/temperature-unit.service';
import { TemperatureUnit } from '@mama-money/models/temperature-unit';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnDestroy {
    public isLoading = false;
    public readonly weatherForecast$: Observable<WeatherResponse>;
    private readonly destroy$: Subject<void> = new Subject<void>();
    private readonly retryClicked$ = new Subject<void>();
    private readonly geocodeLocation$: Observable<PlaceDetailModel>;
    private readonly interval$: Observable<number>;

    public constructor(
        private readonly weatherService: WeatherService,
        private readonly temperatureUnitService: TemperatureUnitService
    ) {
        this.interval$ = interval(1000 * 60 * 20).pipe(
            takeUntil(this.destroy$),
            startWith(0)
        );

        this.geocodeLocation$ = this.weatherService.geocodeLocation('Johannesburg').pipe(
            takeUntil(this.destroy$),
            shareReplay()
        );

        this.weatherForecast$ = merge(this.interval$, this.retryClicked$).pipe(
            tap(() => this.isLoading = true),
            takeUntil(this.destroy$),
            switchMap(() => this.geocodeLocation$),
            switchMap(res => this.weatherService.getLocationWeather(res)),
            //finalize(() => this.isLoading = false) //TODO figure out a better to stop this since this observable does not complete.
            tap(() => this.isLoading = false)
        );
    }

    public get nextTemperatureUnit(): string {
        if (this.temperatureUnitService.currentUnit === TemperatureUnit.CELSIUS) {
            return 'Fahrenheits';
        }

        return 'Celsius';
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public retryNow(): void {
        this.retryClicked$.next();
    }

    public toggleTemperatureUnit(): void {
        return this.temperatureUnitService.toggleUnit();
    }
}
