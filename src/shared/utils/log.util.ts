import { log } from 'console-log-colors';

export const logResultsTable = (results: string[]) => {
  console.log(log.green('Resultados: 👇'));

  const tableData = results.map((result, index) => ({
    Viaje: `#${index + 1} ✈️ `,
    Monto: `$${result} 💰`,
  }));

  console.table(tableData);
};
