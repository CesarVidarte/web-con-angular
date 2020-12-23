import { Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import { DestinoViaje } from "./../models/destino-viaje.model";
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { Appstate } from '../app.module';
import { VoteDownAction, VoteUpAction } from '../models/destinos-viajes-state.model';


@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino : DestinoViaje;
  @Input() posicion : number;
  @HostBinding('attr.class') cssClass= 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;

  constructor(public destinosApiClient: DestinosApiClient, private store: Store<Appstate>) {
    this.clicked = new EventEmitter();
  }
  ngOnInit(): void {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }


}
