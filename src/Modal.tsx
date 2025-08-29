import React, { useState } from 'react';
import type { Order } from './types/Order';

interface FilterProps {
	orders: Order[];
	onFilter: (filteredOrders: Order[]) => void;
}

const Modal: React.FC<FilterProps> = ({ orders, onFilter }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedCliente, setSelectedCliente] = useState<
		'Natura' | 'Avon' | ''
	>('');
	const [minQtdePedidos, setMinQtdePedidos] = useState<number | ''>('');
	const [maxQtdePedidos, setMaxQtdePedidos] = useState<number | ''>('');
	const [chegouNaBase, setChegouNaBase] = useState<boolean | ''>('');

	const handleFilter = () => {
		let filteredOrders = orders;

		if (searchTerm) {
			filteredOrders = filteredOrders.filter((order) =>
				order.ordercli.includes(searchTerm)
			);
		}

		if (selectedCliente) {
			filteredOrders = filteredOrders.filter(
				(order) => order.cliente === selectedCliente
			);
		}

		if (minQtdePedidos !== '') {
			filteredOrders = filteredOrders.filter(
				(order) => order.qtde_pedidos >= (minQtdePedidos as number)
			);
		}

		if (maxQtdePedidos !== '') {
			filteredOrders = filteredOrders.filter(
				(order) => order.qtde_pedidos <= (maxQtdePedidos as number)
			);
		}

		if (chegouNaBase !== '') {
			filteredOrders = filteredOrders.filter(
				(order) => order.chegou_na_base === (chegouNaBase as boolean)
			);
		}

		onFilter(filteredOrders);
		closeModal();
	};

  const reset = ()=>{
    setSearchTerm('');
    setSelectedCliente('');
    setMinQtdePedidos('');
    setMaxQtdePedidos('');
    setChegouNaBase('');
    onFilter(orders);
    closeModal();
  };
  
	const toggleModal = () => setIsOpen(!isOpen);

	const closeModal = () => setIsOpen(false);

	return (
		<div>
			{/* Modal toggle button */}
			<button
				onClick={toggleModal}
				className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				Filtrar
			</button>

			{/* Main modal */}
			{isOpen && (
				<div
					tabIndex={-1}
					aria-hidden={!isOpen}
					className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
				>
					<div className="relative p-4 w-full max-w-2xl max-h-full">
						{/* Modal content */}
						<div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
							{/* Modal header */}
							<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Filtrar
								</h3>
								<button
									type="button"
									onClick={closeModal}
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							{/* Modal body */}
							<div className="p-4 md:p-5 space-y-4">
								<div className="p-4 rounded-md">
									<input
										type="text"
										placeholder="Buscar por Order CLI"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="border border-gray-300 rounded-md p-2 mb-2 w-full"
									/>
									<select
										value={selectedCliente}
										onChange={(e) =>
											setSelectedCliente(
												e.target.value as 'Natura' | 'Avon' | ''
											)
										}
										className="border border-gray-300 rounded-md p-2 mb-2 w-full"
									>
										<option value="">Todos os Clientes</option>
										<option value="Natura">Natura</option>
										<option value="Avon">Avon</option>
									</select>
									<input
										type="number"
										placeholder="Quantidade Mínima de Pedidos"
										value={minQtdePedidos}
										onChange={(e) =>
											setMinQtdePedidos(
												e.target.value ? parseInt(e.target.value) : ''
											)
										}
										className="border border-gray-300 rounded-md p-2 mb-2 w-full"
									/>
									<input
										type="number"
										placeholder="Quantidade Máxima de Pedidos"
										value={maxQtdePedidos}
										onChange={(e) =>
											setMaxQtdePedidos(
												e.target.value ? parseInt(e.target.value) : ''
											)
										}
										className="border border-gray-300 rounded-md p-2 mb-2 w-full"
									/>
									<select
										value={chegouNaBase as string}
										onChange={(e) =>
											setChegouNaBase(
												e.target.value === '' ? '' : e.target.value === 'true'
											)
										}
										className="border border-gray-300 rounded-md p-2 mb-2 w-full"
									>
										<option value="">Chegou na Base?</option>
										<option value="true">Sim</option>
										<option value="false">Não</option>
									</select>
								</div>
							</div>
							{/* Modal footer */}
							<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
								<button
									onClick={handleFilter}
									type="button"
									className="text-white ms-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Filtrar
								</button>

                <button
									onClick={reset}
									type="button"
									className="text-white ms-3 bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Resetar
								</button>

                <button
									onClick={closeModal}
									type="button"
									className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark :bg-gray-700"
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Modal;
