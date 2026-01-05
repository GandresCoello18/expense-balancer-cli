import { log } from 'console-log-colors';

import { CalculationResult } from '../../domain/types';

import { OutputFormatter, OutputHandler } from './types';

export class ConsoleOutputHandler implements OutputHandler {
  public write(data: string): void {
    if (data) {
      console.log(data);
    }
  }
}

export class TableOutputFormatter implements OutputFormatter {
  public format(result: CalculationResult): string {
    const header = log.green('📊 Resultados: 👇');
    const separator = '-----------------------------';

    const rows = result.results.map(tripResult => {
      return `✈️  Viaje #${tripResult.tripNumber}: $${tripResult.formattedExchange} 💰`;
    });

    return [header, separator, ...rows, separator].join('\n');
  }
}

export class TableOutputFormatterWithConsoleTable implements OutputFormatter {
  public format(result: CalculationResult): string {
    if (result.results.length === 0) {
      console.log(log.yellow('⚠️  No hay resultados para mostrar'));
      return '';
    }

    const tableData = result.results.map(tripResult => ({
      Viaje: `#${tripResult.tripNumber} ✈️ `,
      Monto: `$${tripResult.formattedExchange} 💰`,
    }));

    console.log(log.green('📊 Resultados: 👇'));
    console.table(tableData);

    return '';
  }
}
