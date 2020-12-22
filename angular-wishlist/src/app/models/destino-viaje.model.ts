import {v4 as uuid} from 'uuid';

export class DestinoViaje {
  private selected:boolean;
  public servicios: string[];
  constructor(public nombre: string,public imagenUrl: string) {
    this.servicios = ['pileta', 'desayuno'];
  }
  id = uuid();
  isSelected():boolean{
    return this.selected;
  }
  setSelected(s:boolean){
    this.selected = s;
  }
}
