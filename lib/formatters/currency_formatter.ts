// create a formatter for brazillian currency

const currencyBrFormatter = (value: number | string) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return formatter.format(Number(value));
}

export default currencyBrFormatter;

