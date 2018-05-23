import { Component } from '@angular/core';
import * as jQuery from 'jquery';
import { AppHttpService } from '../../app-http.service';


@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {

    address: string;
    restaurants: any[] = [];
    status: string;

    constructor(private appHttpService: AppHttpService){ }

    ngOnInit() {
        jQuery('.parallax').parallax();
    }

    search(e) {
        e.preventDefault();

        if(!this.address) {
            window.Materialize.toast('Insira um endereço', 3000);
            return;
        }

        this.appHttpService.builder('restaurants/by-address?address=' + this.address)
            .list()
            .then( (res) => {
                console.log(res);
               this.restaurants = res.restaurants;
               this.status = res.status;

               if (this.status === 'success' && this.restaurants.length === 0) {
                   this.status = 'error';
               }

               // Efeito para depois de fazer a buscar rodar para baixo para a lista
               let body = jQuery('html, body');
               body.stop().animate({scrollTop: 300}, 500, 'swing');
            });
    }
}