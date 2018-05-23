import {Component} from "@angular/core";
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
            #loginForm{
                margin-top:50px;
            }    
    `],
})

export class LoginComponent {

    user: any = {
        username: null,
        password: null,
    };

    constructor(private authService: AuthService, private router: Router) {}

    login(e) {
        e.preventDefault();

        if (!this.user.username || !this.user.password) {
            window.Materialize.toast('Por favor preencha o formulário', 3000, 'red');
            return;
        }

        let data = {
            grant_type: 'password',
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            username: this.user.username,
            password: this.user.password,
            scope: '',
        };

        this.authService.login(data).then((res) => { // obtem o token
            document.cookie = 'token=' + res.access_token + '; expires=' + res.expires_in; // Presiste o token no cookie
            this.authService.setAccessToken(); // faz o seAccesstoken par apoder armazanar na aplicação
            this.router.navigate(['/']); // reencaminha para a pagina inicial autenticado
        });

    }

}