import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, interval, Observable, shareReplay, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { WeatherService } from '@mama-money/services/weather.service';
import { PlaceDetailModel } from '@mama-money/models/place-detail.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit, OnDestroy {
    public isLoading = false;
    private readonly destroy$: Subject<void> = new Subject<void>();
    private readonly geocodeLocation$: Observable<PlaceDetailModel>;
    private readonly interval$: Observable<number>;

    public constructor(private readonly weatherService: WeatherService) {
        this.interval$ = interval(1000 * 60 * 20).pipe(
            tap(() => this.isLoading = true),
            takeUntil(this.destroy$),
            startWith(0)
        );

        this.geocodeLocation$ = this.weatherService.geocodeLocation().pipe(
            takeUntil(this.destroy$),
            shareReplay()
        );
    }

    public ngOnInit(): void {
        this.interval$.pipe(
            switchMap(() => this.geocodeLocation$),
            switchMap(res => this.weatherService.getLocationWeather(res)),
            takeUntil(this.destroy$),
            finalize(() => this.isLoading = false)
        ).subscribe(console.log);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }
}
