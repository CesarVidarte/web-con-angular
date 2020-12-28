import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule as NgRxStoreModule, Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component' ;
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { Route } from '@angular/compiler/src/core';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
//import { DestinosApiClient } from "./models/destinos-api-client.model";
import { DestinosViajesState, reducerDestinosViajes,
       initializeDestinosViajeState, DestinosViajesEffects, InitMyDataAction } from './models/destinos-viajes-state.model';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component'
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { ReservasModule } from './reservas/reservas.module';
import { env } from 'process';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import Dexie from 'dexie';
import { DestinoViaje } from './models/destino-viaje.model';

// init routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponent },
  { path: 'mas-info', component: VuelosMasInfoComponent },
  { path: ':id', component: VuelosDetalleComponent },
];

const routes: Routes =[
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  {path: 'protected',  component: ProtectedComponent,
  canActivate: [ UsuarioLogueadoGuard ]},
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [ UsuarioLogueadoGuard ],
    children: childrenRoutesVuelos
  }
];
// end init routing

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any>  {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<Appstate>, private http: HttpClient) { }
  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

// fin app init

//redux init
export interface Appstate {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<Appstate> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: initializeDestinosViajeState()
}
// redux fin init

// dexie db
@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  constructor () {
      super('MyDatabase');
      this.version(1).stores({
        destinos: '++id, nombre, imagenUrl',
      });
  }
}

export const db = new MyDatabase();
// fin dexie db



@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent,
    VuelosDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule
  ],
  providers: [
    //DestinosApiClient,
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDatabase 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
