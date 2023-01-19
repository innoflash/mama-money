import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Observable, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
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

    public constructor(private readonly weatherService: WeatherService) {
        this.geocodeLocation$ = this.weatherService.geocodeLocation().pipe(
            takeUntil(this.destroy$),
            shareReplay()
        );
    }

    public ngOnInit(): void {
        this.geocodeLocation$.pipe(
            switchMap(res => this.weatherService.getLocationWeather(res)),
            takeUntil(this.destroy$),
            finalize(() => this.isLoading = false)
        ).subscribe(console.log);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }
}
