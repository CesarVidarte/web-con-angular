import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DestinoViaje } from './destino-viaje.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ESTADO
export interface DestinosViajesState {
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
}

export const initializeDestinosViajeState = function () {
    return {
        items: [],
        loading: false,
        favorito: null
    };
};

//ACCIONES
export enum DestinosViajesActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP= '[Destinos Viajes] Vote Up',
    VOTE_DOWN= '[Destinos Viajes] Vote DOWN'
}

export class NuevoDestinoAction implements Action {
    type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje) { }
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViaje) { }
}
export class VoteUpAction implements Action {
    type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViaje) { }
}
export class VoteDownAction implements Action {
    type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViaje) { }
}
//conjunto de tipos de dato
export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction
    | VoteUpAction | VoteDownAction;

//REDUCERS
export function reducerDestinosViajes(
    state: DestinosViajesState,
    action: DestinosViajesActions
): DestinosViajesState {
    switch (action.type) {
       case DestinosViajesActionTypes.NUEVO_DESTINO: {
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino]
            };
        }
        case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
            //
            //state.items.forEach(x => x.setSelected(false));
            const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
            //fav.setSelected(true);
            return {
                ...state,
                favorito: fav
            };
        }
        case DestinosViajesActionTypes.VOTE_UP: {
            const d: DestinoViaje = (action as VoteUpAction).destino;
            //d.voteUp();
            var dcopy = new DestinoViaje(d.nombre, d.imagenUrl, d.votes); 
            dcopy.voteUp();
            return {
                ...state,
                items: [ ...state.items.map(dest => {
                    if (dest == d) {
                        return dcopy;
                    } 
                }) ]
            };
        }
        case DestinosViajesActionTypes.VOTE_DOWN: {
            const d: DestinoViaje = (action as VoteDownAction).destino;
            var dcopy = new DestinoViaje(d.nombre, d.imagenUrl, d.votes);
            dcopy.voteDown();
            return {
                ...state,
                items: [ ...state.items.map(dest => {
                    if (dest == d) {
                        return dcopy;
                    } 
                }) ]
            };
        }
    }
    return state;
}

//EFFECTS
@Injectable()
export class DestinosViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    );

    constructor(private actions$: Actions) { }
}
