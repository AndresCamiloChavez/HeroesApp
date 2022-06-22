import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagenHeroe'
})
export class ImagenHeroePipe implements PipeTransform {

  transform(value: Heroe, create: boolean= false): string{
    console.log('Valor del heroe', value.id);
    
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
