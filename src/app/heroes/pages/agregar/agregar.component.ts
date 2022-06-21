import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(private params: ActivatedRoute) { }

  ngOnInit(): void {
    this.params.params.subscribe(({id}) => {
      console.log('Valor del parametro ', id)
    })
  }
}
