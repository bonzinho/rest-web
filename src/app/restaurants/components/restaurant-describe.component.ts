import { Component } from '@angular/core';
import * as jQuery from 'jquery';
import { AppHttpService } from '../../app-http.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurant-describe.component.html',
})
export class RestaurantDescribeComponent {

    id: number;
    restaurant: any = {};
    dishes: any = {data: []};
    photos: any = [];
    viewPhone: boolean = false;
    vote: any = {points: '', comment: ''};

    constructor(private appHttpService: AppHttpService, private route: ActivatedRoute) {}
    ngOnInit(){
        this.route.params.subscribe(params => {
           let id = this.id = params['id'];
           let options = {
               filter: {
                   restaurant_id: id
               }
           };

           // Aceder aos dados do restaurante
           this.appHttpService.builder('restaurants')
               .view(id).then((res) => { this.restaurant = res; });

            // Listar os pratos do restaurante
            this.appHttpService.builder('dishes')
                .list(options).then((res) => { this.dishes = res; });

            // Aceder às fotografias do restaurante
            this.appHttpService.builder('restaurants/' + id + '/photos')
                .list().then((res) => {
                this.photos = res;
                setTimeout(()=>{
                    jQuery('.materialboxed').materialbox();
                });
            });
        });
    }

    showPhone(e){
        e.preventDefault();
        if(!this.viewPhone){
            //
        }
        this.viewPhone = true;
    }

    addVote(e, vote){
        e.preventDefault();
        jQuery('.modal').modal();
        jQuery('.modal').modal('open');
        this.vote.points = vote || '';
    }

    sendVote(e){
        e.preventDefault();
        jQuery('.modal').modal('close');
        this.vote.restaurant_id = this.id;
        //
    }

    // Setar as estrelas
    classToVotes(vote) {
        if (this.restaurant.points >= vote){
            return 'amber-text';
        }

        return 'black-text';
    }

}