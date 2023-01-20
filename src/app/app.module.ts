import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@mama-money/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiKeyInterceptor } from '@mama-money/interceptors/api-key.interceptor';
import {
    HourlyWeatherStripComponent
} from '@mama-money/components/hourly-weather-strip/hourly-weather-strip.component';
import { TimestampToTimePipe } from '@mama-money/pipes/timestamp-to-time.pipe';
import { TemperatureUnitPipe } from './pipes/temperature-unit.pipe';


@NgModule({
    declarations: [
        AppComponent,
        HourlyWeatherStripComponent,
        TimestampToTimePipe,
        TemperatureUnitPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiKeyInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
