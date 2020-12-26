import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from "./../../models/destino-viaje.model";
import { DestinosApiClient } from './../../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { Appstate } from '../../app.module';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(public destinosApiClient: DestinosApiClient, private store: Store<Appstate>) {
    this.onItemAdded = new EventEmitter;
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
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
  }
  elegido(e:DestinoViaje) {
    this.destinosApiClient.elegir(e);
    
  }

}
