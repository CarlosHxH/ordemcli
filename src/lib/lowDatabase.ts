import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

interface Order {
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

type Data = {
	orders: Order[];
};

export default function setupDB() {
	const defaultData: Data = { orders: [] };
	const db = new LowSync<Data>(new JSONFileSync('file.json'), defaultData);
	db.read();

	// Initialize the database if it is empty
	if (!db.data) {
		db.data = defaultData;
	}

	console.log({ db });

	// Example of adding a new order
	const newOrder: Order = {
		id: '1',
		ordercli: 'Order 1',
		cliente: 'Natura',
		previsao_chegada: '2023-10-01',
		qtde_pedidos: '10',
		qtde_volumes: '5',
		chegou_na_base: false,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	db.data.orders.push(newOrder);
	db.write();
	db.read();
	console.log('=>>', db.data);
}
