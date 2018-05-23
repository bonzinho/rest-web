//Centraliza todas as requisições
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {environment} from '../environments/environment';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise'; //importar promisses

@Injectable()
export class AppHttpService {

    /* protecteed so tem acesso esta classe e outras classes que tenham herança come sta classe */

    protected  url: string;
    protected header: Headers;


    constructor(protected http: Http, private router: Router) {
        this.setAccessToken();
    }

    request() {
        return this.http;
    }


    setAccessToken() {
        let token = this.getCookie('token');
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.header = headers;
    }

    // Construtor de rotas para as requisições
    builder(resource: string) {
        this.url =  environment.server_url + '/api/v1/' + resource;
        return this;
    }

    list(options: any = {}) {

        const _options = new RequestOptions({headers: this.header});
        let url = this.url;

        if (options.filters !== undefined) { // Se existir filtro vai montar a query string para o url
            let filters = options.filters;
            filters.forEach((item, index) => { // foreach para aceder à chave e ao valor para o url
                let field = Object.keys(item)[0]; // Chave
                let value = item[field]; // Valor
                url = url + '?where[' + field + ']=' + value; // Url montado
            });
        }

        let observable = this.http.get(url, _options); // Usa o url deste escopo para o caso de existir filtro
        return this.toPromise(observable);
    }

    view(id: number) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        let observable = this.http.get(url + '/' + id, _options);
        return this.toPromise(observable);
    }

    update(id: number, data: object) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        let observable = this.http.put(url + '/' + id, data, _options);
        return this.toPromise(observable);
    }

    insert(data: Object) {
        const _options = new RequestOptions({headers: this.header});
        const url = this.url;
        let observable = this.http.post(url + '/', data, _options);
        return this.toPromise(observable);
    }

    delete(id: number) {
        const _options = new RequestOptions({headers: this.header});
        const _url = this.url;

        let observable = this.http.delete(_url + '/' + id, _options);
        return this.toPromise(observable);
    }

    // Abstrai o .toPromise
    protected toPromise(request) {  // protected, faz com que todas as classses que tenham herança possam ter acesso mas todas as outras não
        return request.toPromise()
            .then((res) => {
                return res.json() || {};
            })
            .catch((err) => {
                let message = 'Algo deu errado no servidor, informe o erro ' + err.status + ' ao administrador';
                if (err.status === 401) {
                    message = 'Sem permissões de acesso, insira umas credenciais válidas';
                    this.router.navigate(['/login']);
                }

                if (err.status === 422) {
                    message = 'Falha de validação, verifique os campos';
                }

                if (err.status === 404) {
                    message = 'Sem conexão ao servidor, verifique a conexão ou tente novamente em alguns minutos';
                }

                window.Materialize.toast(message, 3000, 'red');
            });
    }


    // Ler o cookie para usar no AccessToken, para já está private, caso seja necessário usar numa class com herança passar para protected
    private getCookie(name: string) {
        let cookies = document.cookie;
        if (!cookies) {
            return null;
        }

        // Cookiem vem neste formato: 'token=valor;outroNome=valor;maisum=valor;'
        /*
        * 'token: valor',
        * 'outroNome: valor',
        * 'maisum: valor'
        */
        let cookiesCollection: string[] = cookies.split(';');
        for (let i = 0; i < cookiesCollection.length; i++) {
            let cookieCurrent = cookiesCollection[i].split('=');

            if (cookieCurrent[0].trim() === name) {
                return cookieCurrent[1] || null;
            }
        }
        return null;
    }
}