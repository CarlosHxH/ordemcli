import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { LogIn } from 'lucide-react';

interface AdminLoginProps {
	onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			/*
			if (error) {
				const { error: newError } = await supabase.auth.signUp({
					email,
					password,
				});
				if (newError) throw newError;
				toast.success('Login criado');
			}*/

			if (error) throw error;

			toast.success('Login realizado com sucesso!');
			onLogin();
		} catch (error: any) {
			toast.error(error.message || 'Erro ao fazer login');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<div className="flex items-center justify-center mb-8">
					<LogIn className="h-12 w-12 text-indigo-600" />
				</div>
				<h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
					Acesso Administrativo
				</h2>
				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							placeholder="admin@exemplo.com"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Senha
						</label>
						<input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
					>
						{loading ? 'Entrando...' : 'Entrar'}
					</button>
				</form>
			</div>
		</div>
	);
}
