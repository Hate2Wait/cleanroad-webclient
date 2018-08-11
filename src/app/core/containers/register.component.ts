import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '@cleanroad/reducers';
import { Observable } from 'rxjs';
import { RegisterUser } from '@cleanroad/core/models';

import * as titleActions from '@cleanroad/core/actions/title.actions';
import * as authActions from '@cleanroad/core/actions/auth.actions';

@Component({
    selector: 'cleanroad-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    loading$: Observable<boolean>;

    public constructor(private store: Store<fromRoot.AppState>) {
        this.store.dispatch(new titleActions.SetTitle('Register'));
        this.loading$ = this.store.select(fromRoot.getAuthLoading);
    }

    public register(registerUser: RegisterUser) {
        this.store.dispatch(new authActions.Register(registerUser));
    }
}
