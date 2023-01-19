import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherService } from '@mama-money/services/weather.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<void> = new Subject<void>();

    public constructor(private readonly weatherService: WeatherService) {

    }


    public ngOnInit(): void {
        this.weatherService.geocodeLocation().subscribe(console.log);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }
}
