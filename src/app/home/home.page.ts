import { Component, ViewChild, Renderer2 } from '@angular/core';
import { AnimationController, Platform, Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
@ViewChild('blocks') blocks: any;
@ViewChild('background') background: any;
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

      public initialStep: number = 0;
      private maxTranslate: number;
      private animation: Animation;


  constructor(
    private animationCtrl: AnimationController,
    private platform: Platform,
    private renderer: Renderer2
  ) {
    this.maxTranslate = this.platform.height() - 200;
  }
    ngAfterViewInit() {
      this.createAnimation();
    }

      toggleBlocks() {
        this.initialStep = this.initialStep === 0 ? this.maxTranslate : 0;
       this.animation.direction(this.initialStep === 0 ? 'reverse' : 'normal').play(); 

       this.setBackgroundOpacity();
      }

    createAnimation() {
      this.animation = this.animationCtrl.create()
        .addElement(this.blocks.nativeElement)
        .duration(300)
        .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`);
      }
      setBackgroundOpacity() {

        this.renderer.setStyle(this.background.nativeElement, 'opacity', this.initialStep === 0 ? '0' : '1')
      }

fixedBlocks(): boolean {
  return this.initialStep === this.maxTranslate; 
  

}

    }


