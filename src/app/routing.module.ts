import { RouterModule, Routes }  from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home/home.component';
import { UsersComponent } from './components/users/users.component';

export const appRoutes: Routes = [
    {   path: 'login', component: LoginComponent },
    {   path: 'home', component: HomeComponent },
    {   path: 'main', component: AppComponent },
    {   path: 'users', component: UsersComponent },
    {   path: '',   redirectTo: '/login', pathMatch: 'full' },
    {   path: '**', component: PageNotFoundComponent } // <-- wildcard route
];

@NgModule({
    imports: [
        
        RouterModule.forRoot(
            appRoutes,
            {
                //enableTracing: true,    // <-- debugging purposes only
                                        // Remove once production building
            }
        )
    ],
    declarations: [],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }

