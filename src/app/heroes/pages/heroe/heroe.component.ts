import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, map, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private heroeService: HeroesService
  ) {}
  heroe!: Heroe;
  ngOnInit(): void {
    this.activateRoute.params.pipe(
      // delay(3000),
      switchMap(({ id }) => this.heroeService.getHeroeById(id))
    ).pipe().subscribe(heroe =>{
      this.heroe = heroe;
    });
  }
}
