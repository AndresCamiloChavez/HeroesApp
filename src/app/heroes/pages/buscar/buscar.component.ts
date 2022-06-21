import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroeSeleccionado!: Heroe;

  heroes: Heroe[] = [];
  constructor(private heroeService: HeroesService, private router: Router) { }

  ngOnInit(): void {
    
  }
  buscando(){
    if(this.termino.length >0){
      this.heroeService.getSugerencias(this.termino).subscribe((data) => {
        this.heroes = data as Heroe[];
      })
    }else{
      this.heroes = [];
    }
    
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent ){
    if(event.option.value){
      this.heroeService.getHeroeById(event.option.value.id).subscribe(heroe =>{
        this.heroeSeleccionado = heroe;
        this.router.navigate(['/heroes/'+event.option.value.id]);
      })
    }

    
  }

}
