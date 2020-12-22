import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from "./../models/destino-viaje.model";
import { DestinosApiClient } from './../models/destinos-api-client.model';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(public destinosApiClient:DestinosApiClient) {
    this.onItemAdded = new EventEmitter;
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  ngOnInit(): void {
  }

  agregado(d:DestinoViaje){
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    return false;
  }
  elegido(e:DestinoViaje) {
    this.destinosApiClient.elegir(e);
    
  }

}