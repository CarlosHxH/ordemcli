export const weekday = (data: string) => {
	const d = new Date(data);
	const diasDaSemana = [
		'Domingo',
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado',
	][d.getDay()];
	const formatter = new Intl.DateTimeFormat('pt-BR', {
		timeZone: 'Europe/Berlin',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
	const berlinTime = formatter.format(d);
	return `${berlinTime} - ${diasDaSemana}.`;
};
