import { Component,  } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';

let accelHandler: PluginListenerHandle;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  data: any; //variável da frontpage
  x: any; //receber a coordenada x do sensor
  y: any; //receber a coordenada y do sensor
  z: any; //receber a coordenada z do sensor
  a: any;
  b: any;
  g: any;

  constructor() {}

  async startWatching() {

    // Once the user approves, can start listening:
    accelHandler = await Motion.addListener('accel', event => {
      console.log('Device motion event:', event);
      this.x = event.acceleration.x; //recebendo a coordenada x diretor do sensor
      this.y = event.acceleration.y; //recebendo a coordenada y diretor do sensor
      this.z = event.acceleration.z; //recebendo a coordenada z diretor do sensor
      this.a = event.rotationRate.alpha;
      this.b = event.rotationRate.beta;
      this.g = event.rotationRate.gamma;

      console.log('X: ' + this.x);
      console.log('Y: ' + this.y);
      console.log('Z: ' + this.z);
      console.log('alpha: ' + this.a);
      console.log('beta: ' + this.b);
      console.log('gamma: ' + this.g);
    });

  }

  capturarCoordenadas() {

    this.data = {x: this.x, y: this.y, z: this.z, a: this.a, b: this.b, g: this.g}; //passando os valores das coordenadas para a frontpage

  }

  stopWatching() {

    if (accelHandler) {
      accelHandler.remove();
      console.log('Parou!');
    }
  }
}




