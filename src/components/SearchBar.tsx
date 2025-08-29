import React, { useState } from 'react';

interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};
	const reset = () => {
		setSearchTerm('');
		onSearch('');
	};
	return (
		<form className="flex items-center">
			<input
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
				placeholder="Buscar..."
				className={`border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 focus:w-full`}
			/>
			<button
				onClick={reset}
				type="reset"
				className="bg-red-500 text-white rounded-r-md p-2 px-4 hover:bg-red-700 transition duration-200"
			>
				&times;
			</button>
		</form>
	);
};

export default SearchBar;
