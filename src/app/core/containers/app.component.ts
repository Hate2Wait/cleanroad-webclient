import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { Portal, TemplatePortal, TemplatePortalDirective } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PRIMARY_THEME } from '@cleanroad/core/core.constants';
import * as fromRoot from '@cleanroad/reducers';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as authActions from '@cleanroad/core/actions/auth.actions';
import * as layoutActions from '@cleanroad/core/actions/layout.actions';

@Component({
    selector: 'cleanroad-root',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    private overlayRef: OverlayRef;
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private authLoadingSubscription: Subscription;
    theme = PRIMARY_THEME;
    @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;
    @ViewChild('overlay') overlayTemplate: TemplateRef<any>;


    public constructor(private overlay: Overlay,
        private overlayContainer: OverlayContainer,
        private vcr: ViewContainerRef,
        private store: Store<fromRoot.AppState>) {
        this.store.dispatch(new layoutActions.RestoreTheme());
        this.store.dispatch(new authActions.RestoreLogin());
    }

    public ngOnInit(): void {
        this.subscribeThemeChanges();
        this.subscribeAuthLoading();
        this.initializeOverlay();
    }

    private subscribeThemeChanges(): void {
        this.store.select(fromRoot.getTheme).subscribe(theme => {
            if (theme !== this.theme) {
                this.overlayContainer.getContainerElement().classList.remove(this.theme);
                this.theme = theme;
            }
            this.overlayContainer.getContainerElement().classList.add(theme);
        });
    }

    private subscribeAuthLoading(): void {
        this.authLoadingSubscription = this.store
            .select(fromRoot.getAuthLoading)
            .pipe(delay(1000))
            .subscribe((loading: boolean) => {
                this.loading$.next(loading);
                if (!loading) {
                    this.overlayRef.detach();
                    this.test();
                    this.authLoadingSubscription.unsubscribe();
                }
            });
    }

    private test(): void {
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().bottom('0px'),
            minWidth: '100%'
        });

        this.overlayRef.attach(new TemplatePortal(this.overlayTemplate, this.vcr));
    }

    private initializeOverlay(): void {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global()
            .centerVertically()
            .centerHorizontally();

        config.hasBackdrop = true;
        config.backdropClass = 'cdk-overlay-dark-backdrop';

        this.overlayRef = this.overlay.create(config);
        this.overlayRef.attach(this.templatePortal);
    }
}
