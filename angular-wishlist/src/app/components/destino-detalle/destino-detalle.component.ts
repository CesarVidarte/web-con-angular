//import { Component, OnInit, InjectionToken, Inject, Injectable } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { DestinosApiClient } from './../../models/destinos-api-client.model';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
//import { Store } from '@ngrx/store';
//import { Appstate } from '../../app.module';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  // providers: [DestinosApiClient]
  // providers: [ { provide: DestinosApiClient, useClass: DestinosApiClientDecorated } ],
  providers: [
    DestinosApiClient
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino:DestinoViaje;
  //constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) {}
  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
