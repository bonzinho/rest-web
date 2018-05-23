import {Component, OnInit} from "@angular/core";

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {

    user: Object = {};

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.getUser()
            .then((user: any) => {
                this.user = user;
            });
    }

    save(e) {
        e.preventDefault();
        this.authService.builder().changeProfile(this.user)
            .then(() => {
                window.Materialize.toast('Guardado com sucesso', 3000, 'green');
            });
    }
}