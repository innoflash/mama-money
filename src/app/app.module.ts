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
import { HourlyWeatherBodyComponent } from './components/hourly-weather-body/hourly-weather-body.component';
import { WeatherIconPipe } from './pipes/weather-icon.pipe';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherFilterPipe } from './pipes/weather-filter.pipe';


@NgModule({
    declarations: [
        AppComponent,
        HourlyWeatherStripComponent,
        TimestampToTimePipe,
        TemperatureUnitPipe,
        HourlyWeatherBodyComponent,
        WeatherIconPipe,
        WeatherFilterPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule.forRoot(),
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
