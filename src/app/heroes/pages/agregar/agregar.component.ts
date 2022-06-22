import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import {  of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.params.url.subscribe(data =>{
      if(data[0].path == 'editar'){
        this.params.params.pipe(
          switchMap(({id}) => this.heroeService.getHeroeById(id))
        ).subscribe(dataHeroe => {
          this.heroe = dataHeroe;
        });
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
        this.mostarSnackBar('Registro actualizado');
      })
    }else{
      this.heroeService.agregarHeroe(this.heroe).subscribe((respuestaHeroe) => {
        console.log('Respuesta', respuestaHeroe);
        this.mostarSnackBar('Registro creado');
        // this.router.navigate(['/heroes/listado'])
      });
    }
  }
  borrarHeore(){
    const valueDialog = this.dialog.open(ConfirmarComponent, {width: '250px',data: {...this.heroe}});

    valueDialog.afterClosed().pipe(
      switchMap((result) =>{
        if(result){
          return this.heroeService.borrarHeroe(this.heroe.id!)
        }
        return of([{}])
      } )
    ).subscribe( _ =>{
      this.router.navigate(['heroes/listado'])
    })
  }
  mostarSnackBar(mensaje: string){
    this.snackBar.open(mensaje,'ok!', {
      duration: 2600,
    });

  }
}
