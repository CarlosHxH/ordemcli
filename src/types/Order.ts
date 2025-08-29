export interface Order {
	id: string;
	ordercli: string;
	cliente: 'Natura' | 'Avon';
	previsao_chegada: string;
	qtde_pedidos: string;
	qtde_volumes: string;
	chegou_na_base: boolean;
	created_at?: string;
	updated_at?: string;
}
