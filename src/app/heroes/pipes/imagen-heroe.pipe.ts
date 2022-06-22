import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagenHeroe',
  pure: false 
})
export class ImagenHeroePipe implements PipeTransform {

  transform(value: Heroe, create: boolean= false): string{
    console.log('se proceso');
    
    if(value.id){
      if(value.alt_img){
        return value.alt_img;
      }
      return `assets/heroes/${value.id}.jpg`;
    }else{
      return 'assets/no-image.png';
    }
  }

}
