import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CarrinhoService} from '../carrinho.service';
import { ItemCarrinho } from 'app/shared/item-carrinho';



@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    "endereco": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    "numero": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, Validators.required)
  })

  public idPeidoCompra: number;
  public itensCarrinho: ItemCarrinho[]=[];

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
    ) { }
  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    console.log(this.itensCarrinho)
  }

  public confirmarCompra(): void {
    if(this.formulario.status ==='INVALID'){
      console.log('formulario esta valido');
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    }else{
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
      )
      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido:number)=>{
          this.idPeidoCompra = idPedido;
          this.carrinhoService.limparCarrinho();
      })
      console.log(pedido);
    }
  }
  public adicionar(item:ItemCarrinho):void{
    this.carrinhoService.adicionarQuantidade(item)
  }
}
