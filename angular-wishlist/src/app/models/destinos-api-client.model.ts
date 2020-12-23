import { DestinoViaje } from './destino-viaje.model';
import { Observable } from 'rxjs';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';
import { Store } from '@ngrx/store';
import { Appstate } from '../app.module';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
	destinos:DestinoViaje[]=[];

	constructor(private store: Store<Appstate>) {
		this.store
			.select(state => state.destinos)
			.subscribe((data) => {
				console.log("destinos sub store");
				console.log(data);
				this.destinos = data.items;
			});
		this.store
			.subscribe((data) => {
				console.log("all store");
				console.log(data);
			});
	}
	
	add(d:DestinoViaje){
	  //aqui incovariamos al servidor
	  this.store.dispatch(new NuevoDestinoAction(d));
	}
	getById(id:String):DestinoViaje{
	  return this.destinos.filter(function(d){return d.id.toString() == id;})[0];
    }
    getAll():DestinoViaje[] {
    	return this.destinos;
    }
    elegir(d:DestinoViaje){
	  //aqui incovariamos al servidor
	  this.store.dispatch(new ElegidoFavoritoAction(d));
	}
	isSelected(destino: DestinoViaje): Observable<boolean> {
		return this.store.select<boolean>((state: Appstate) => state.destinos.favorito == destino);
	}
}