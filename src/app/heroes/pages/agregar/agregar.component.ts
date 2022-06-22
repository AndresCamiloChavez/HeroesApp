import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { catchError, switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  publichers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  };
  constructor(
    private params: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.params.url.subscribe(data =>{
      if(data[0].path == 'editar'){
        this.params.params.pipe(
          switchMap(({id}) => this.heroeService.getHeroeById(id))
        ).subscribe(dataHeroe => {
          this.heroe = dataHeroe;
        })
      }
    })
  }

  guardar() {
    if (this.heroe.superhero.trim().length == 0) {
      return;
    }
    if(this.heroe.id){
      this.heroeService.actualizarHeroe(this.heroe).subscribe(dataHeore => {
        console.log();
      })
    }else{
      this.heroeService.agregarHeroe(this.heroe).subscribe((respuestaHeroe) => {
        console.log('Respuesta', respuestaHeroe);
        this.router.navigate(['/heroes/listado'])
      });
    }
  }
}
