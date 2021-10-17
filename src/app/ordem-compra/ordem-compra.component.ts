import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario:FormGroup = new FormGroup({
    'endereco': new FormControl(null,[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
    'numero':new FormControl(null,[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
    'complemento':new FormControl(null,[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
    'formaPagamento':new FormControl(null,[Validators.required]),
  })
  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {
    console.log(this.formulario.value)
  }
}
