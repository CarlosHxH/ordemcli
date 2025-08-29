import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { LogOut, Settings, Users, Plus } from 'lucide-react';
import type { Order } from '../types/Order';

interface AdminPanelProps {
	orders: Order[];
	onLogout: () => void;
	onOrdersUpdate: () => void;
}

const dataAtual = new Date();
dataAtual.setDate(dataAtual.getDate() + 3);
const dataCom2Dias = dataAtual.toISOString().slice(0, 10);

export default function AdminPanel({
	orders,
	onLogout,
	onOrdersUpdate,
}: AdminPanelProps) {
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		id: '',
		ordercli: '',
		cliente: 'Natura',
		previsao_chegada: dataCom2Dias,
		qtde_pedidos: '',
		qtde_volumes: '',
	});

	const handleLogout = async () => {
		try {
			await supabase.auth.signOut();
			toast.success('Logout realizado com sucesso!');
			onLogout();
		} catch (error: any) {
			toast.error('Erro ao fazer logout');
		}
	};

	const handleEditar = async (id: string) => {
		try {
			const data = orders.find((d) => d.id === id);
			if (data) setFormData(data as any);
			if (!data) throw 'Não foi possivel processar.';
			setShowForm(true);
		} catch (error: any) {
			toast.error('Erro ao excluir pedido');
		}
	};

	const handleDeleteOrder = async (id: string) => {
		if (!window.confirm('Tem certeza que deseja excluir este pedido?')) return;
		try {
			const { data, error } = await supabase
				.from('orders')
				.delete()
				.eq('id', id);
			if (error) throw error;
			toast.success('Pedido excluído com sucesso!');
			onOrdersUpdate();
		} catch (error: any) {
			toast.error('Erro ao excluir pedido');
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { id, ...data } = formData;
			if (!!id) {
				const { error } = await supabase
					.from('orders')
					.update(data)
					.eq('id', id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from('orders').insert([
					{
						...data,
						qtde_pedidos: parseInt(formData.qtde_pedidos),
						qtde_volumes: parseInt(formData.qtde_volumes),
					},
				]);
				if (error) throw error;
			}

			toast.success('Pedido criado com sucesso');
			reset();
			onOrdersUpdate();
		} catch (error: any) {
			toast.error('Erro ao criar pedido');
		}
	};

	const reset = () => {
		setShowForm(false);
		setFormData({
			id: '',
			ordercli: '',
			cliente: 'Natura',
			previsao_chegada: new Date().toISOString().slice(0, 10),
			qtde_pedidos: '',
			qtde_volumes: '',
		});
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<Settings className="h-8 w-8 text-indigo-600" />
							<span className="ml-2 text-xl font-semibold">Painel</span>
						</div>
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setShowForm(!showForm)}
								className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
							>
								<Plus className="h-5 w-5 mr-2" />
								Novo
							</button>
							<button
								onClick={handleLogout}
								className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
							>
								<LogOut className="h-5 w-5 mr-2" />
								Sair
							</button>
						</div>
					</div>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{showForm && (
					<div className="bg-white rounded-lg shadow p-6 mb-8">
						<div className={'flex justify-between'}>
							<h2 className="text-xl font-semibold mb-4">
								{!!formData?.id ? 'Editar' : 'Criar'}
							</h2>
							<button
								onClick={reset}
								className="border px-4 text-gray-500 hover:bg-red-400 hover:delay-150 me-2 transition rounded-lg transition duration-300 ease-in-out"
							>
								&times;
							</button>
						</div>
						<form
							onSubmit={handleSubmit}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
						>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									OrderCLI
								</label>
								<input
									type="text"
									required
									value={formData.ordercli}
									onChange={(e) =>
										setFormData({ ...formData, ordercli: e.target.value })
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Cliente
								</label>
								<select
									value={formData.cliente}
									onChange={(e) =>
										setFormData({
											...formData,
											cliente: e.target.value as 'Natura' | 'Avon',
										})
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								>
									<option value="Natura">Natura</option>
									<option value="Avon">Avon</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Previsão de Chegada
								</label>
								<input
									type="date"
									required
									value={formData.previsao_chegada}
									onChange={(e) =>
										setFormData({
											...formData,
											previsao_chegada: e.target.value,
										})
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Quantidade de Pedidos
								</label>
								<input
									type="number"
									required
									min="1"
									value={formData.qtde_pedidos}
									onChange={(e) =>
										setFormData({ ...formData, qtde_pedidos: e.target.value })
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Quantidade de Volumes
								</label>
								<input
									type="number"
									required
									min="1"
									value={formData.qtde_volumes}
									onChange={(e) =>
										setFormData({ ...formData, qtde_volumes: e.target.value })
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
							<div className="flex items-end">
								<button
									type="submit"
									className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full"
								>
									{!!formData?.id ? 'Atualizar' : 'Adicionar'}
								</button>
							</div>
						</form>
					</div>
				)}

				<div className="bg-white rounded-lg shadow">
					<div className="px-4 py-5 sm:p-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
							<Users className="h-5 w-5 mr-2" />
							Gerenciamento de Pedidos
						</h3>
						<div className="mt-4">
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Order CLI
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Cliente
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Previsão
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Pedidos/Volumes
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Status
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Ações
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{orders.map((order) => (
											<tr key={order.id}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{order.ordercli}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{order.cliente}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{new Date(
														order.previsao_chegada
													).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{order.qtde_pedidos}/{order.qtde_volumes}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span
														className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
															order.chegou_na_base
																? 'bg-green-100 text-green-800'
																: 'bg-yellow-100 text-yellow-800'
														}`}
													>
														{order.chegou_na_base ? 'Chegou' : 'Pendente'}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													<button
														onClick={() => handleEditar(order.id)}
														className="text-blue-500 hover:text-blue-900 me-2"
													>
														Editar
													</button>
													<button
														onClick={() => handleDeleteOrder(order.id)}
														className="text-red-600 hover:text-red-900"
													>
														Excluir
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
