import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<void> = new Subject<void>();

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }
}
