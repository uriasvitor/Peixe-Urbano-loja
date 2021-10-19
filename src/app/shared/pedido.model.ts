import { ItemCarrinho } from "./item-carrinho";

export class Pedido {
    constructor(
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaPagamento: string,
        public itens: Array<ItemCarrinho>=[]
    ){}
}