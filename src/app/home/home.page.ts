import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public options: Array<any> = [

    { icon: 'person-add-outline', text: 'Indicar Amigos'},
    { icon: 'phone-portrait-outline', text:'recarga de celular'},
    { icon: 'wallet-outline', text: 'Depositar'},
    { icon: 'options-outline', text: 'Ajustar limite'},
    { icon: 'help-circle-outline'  , text: 'Me ajuda'},
    { icon: 'barcode-outline'  , text: 'pagar'},
    { icon: 'lock-open-outline'  , text: 'Bloquear cartão'},
    { icon: 'card-outline'  , text: 'Cartão virtual'}
];
  public slidesOptions: any ={slidesPerView: 3, freeMode: true};
      public items: Array<any> = [
        { icon: 'help-circle-outline', text: 'Me ajuda'},
        { icon: 'person-outline', text: 'Perfil'},
        { icon: 'cash-outline', text: 'Configurar Conta'},
        { icon: 'card-outline', text: ' Configurar Cartao'},
        { icon: 'phone-portrait-outline', text: 'Configurações do App'}
      ];

  constructor() {}

}
