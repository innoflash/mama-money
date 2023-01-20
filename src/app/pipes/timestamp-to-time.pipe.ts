import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timestampToTime'
})
export class TimestampToTimePipe implements PipeTransform {

    public transform(value: number, format: string = 'HH A'): unknown {
        return moment(value, 'X').format(format);
    }
}
