export interface Menu {
    nombre: string,
    icon: string,
    childrens: Array<Menu>,
    tipo: string,
    ruta?: string
}

export interface Main {
  label: string;
  icon: string;
}