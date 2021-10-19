import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Starship} from "../../../starships/models/starship.model";
import {Vehicle} from "../../models/vehicle.model";
import {filter, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {VehiclesService} from "../../services/vehicles.service";

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  item$: Observable<Vehicle>;
  @Input() isLoading: boolean;

  constructor(private route: ActivatedRoute, private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.item$ = this.route.paramMap.pipe(
      filter((params: any) => !!params.get('id')),
      switchMap((params) => {
        const id = params.get('id');
        return this.vehiclesService.fetchById(id);
      }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

}
