import { Component, ViewChild, Renderer2 } from '@angular/core';
import { AnimationController, Platform, Animation, Gesture, GestureController, GestureDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
@ViewChild('blocks') blocks: any;
@ViewChild('background') background: any;
@ViewChild('swipeDown') swipeDown: any;
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
      private gesture: Gesture;
      public swiping: boolean = false;



  constructor(
    private animationCtrl: AnimationController,
    private platform: Platform,
    private renderer: Renderer2,
    private gestureCtrl: GestureController
  ) {
    this.maxTranslate = this.platform.height() - 200;
  }
    ngAfterViewInit() {
      this.createAnimation();
      this.detectSwipe();
    }
    detectSwipe(){
      this.gesture = this.gestureCtrl.create({
        el: this.swipeDown.el,
        gestureName: 'swipe-down',
        threshold: 0,
        onMove: ev => this.onMove(ev),
        onEnd: ev => this.onEnd(ev)
      }, true );
      this.gesture.enable(true);
    }

    onMove(ev: GestureDetail) {
        if ( this.swiping) {
          this.animation.direction('normal').progressStart(true);
          this.swiping = true;
        }
        const step:number = this.getStep(ev);
        this.animation.progressStep(step);
        this.setBackgroundOpacity(step);
  
    }

    onEnd(ev: GestureDetail) {
        if ( this.swiping) return;
        this.gesture.enable(false);
        const step: number = this.getStep(ev);
        const shouldComplete: boolean = step > 0.5;

        this.animation.progressEnd(shouldComplete ? 1 : 0,step);

        this.initialStep = shouldComplete ? this.maxTranslate : 0;
        this.setBackgroundOpacity();
        this.swiping = false ;
    }

    getStep(ev: GestureDetail): number{
      const delta: number = this.initialStep + ev.deltaY;
      return delta / this.maxTranslate;
    }

      toggleBlocks() {
        this.initialStep = this.initialStep === 0 ? this.maxTranslate : 0;
        this.gesture.enable(false);
       this.animation.direction(this.initialStep === 0 ? 'reverse' : 'normal').play(); 

       this.setBackgroundOpacity();
      }

    createAnimation() {
      this.animation = this.animationCtrl.create()
        .addElement(this.blocks.nativeElement)
        .duration(300)
        .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`)
        .onFinish(() => this.gesture.enable(true)); 
      }
      setBackgroundOpacity(value: number= null) {

        this.renderer.setStyle(this.background.nativeElement, 'opacity', value ? value : this.initialStep === 0 ? '0' : '1')
      }

fixedBlocks(): boolean {
  return this.swiping || this.initialStep === this.maxTranslate; 
  

}

    }


