export type WeatherModel = {
    description: string;
    icon: string;
    main: string;
    id: number;
};

export type DayTimesModel = {
    day: number;
    eve: number;
    morn: number;
    night: number;
};

export type WeatherDetailModel = {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
    weather: WeatherModel[];
};

export type DailyWeatherModel = Omit<WeatherDetailModel, 'feels_like'> & {
    feels_like: DayTimesModel,
    temp: DayTimesModel & {
        min: number;
        max: number;
    }
};

export type WeatherResponse = {
    current: WeatherDetailModel;
    daily: DailyWeatherModel[];
    hourly: WeatherDetailModel[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
};