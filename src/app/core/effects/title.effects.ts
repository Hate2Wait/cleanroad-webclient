import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import * as titleActions from '@cleanroad/core/actions/title.actions';
import { TitleActionTypes } from '@cleanroad/core/actions/title.actions';

@Injectable()
export class TitleEffects {
    @Effect() tabTitle$: Observable<Action> = this.actions$
        .ofType(TitleActionTypes.SetTitle)
        .pipe(
            switchMap((action: titleActions.SetTitle) => {
                this.title.setTitle(`CleanRoad | ${ action.title }`);
                return of();
            })
        );

    public constructor(private actions$: Actions, private title: Title) {}
}
