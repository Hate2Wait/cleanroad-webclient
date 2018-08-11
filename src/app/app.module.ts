import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@cleanroad/app-routing.module';
import { AppComponent } from '@cleanroad/core/containers';
import { CoreModule } from '@cleanroad/core/core.module';
import { AuthEffects, LayoutEffects, TitleEffects } from '@cleanroad/core/effects';
import { reducers, metaReducers } from '@cleanroad/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';



@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        EffectsModule.forRoot([
            AuthEffects,
            LayoutEffects,
            TitleEffects
        ]),
        CoreModule.forRoot(),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'en-US' },
        UniqueSelectionDispatcher
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
