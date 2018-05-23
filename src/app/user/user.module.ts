import {NgModule} from '@angular/core';

import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PasswordComponent } from '../user/components/password.component';
import { ProfileComponent } from '../user/components/profile.component';
import { LoginComponent } from '../user/components/login.component';
import { LogoutComponent } from '../user/components/logout.component';

import {AuthService} from './services/auth.service';

const appRoutes: Routes = [
    {path: 'password', component: PasswordComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        PasswordComponent,
        ProfileComponent,
        LoginComponent,
        LogoutComponent
    ],
    providers: [
        AuthService,
    ]
})

export class UserModule {}