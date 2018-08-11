import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, RegisterComponent } from '@cleanroad/core/containers';
import { NotAuthorizedAuthGuard } from '@cleanroad/core/guards';


const routes: Routes = [{
    path: '',
    redirectTo: 'browse',
    pathMatch: 'full'
}, {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthorizedAuthGuard]
}, {
    path: 'register',
    component: RegisterComponent
}

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})

export class AppRoutingModule { }
