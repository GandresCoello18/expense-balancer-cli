import { CalculationResult } from '../../domain/types';
import { InputHandler } from '../../infrastructure/input/types';
import { OutputFormatter, OutputHandler } from '../../infrastructure/output/types';
import { CalculateExpensesUseCase } from '../use-cases/calculate-expenses.use-case';

export class ExpenseCalculatorService {
  private readonly calculateExpensesUseCase: CalculateExpensesUseCase;
  private readonly outputFormatter: OutputFormatter;
  private readonly outputHandler: OutputHandler;

  constructor(outputFormatter: OutputFormatter, outputHandler: OutputHandler) {
    this.calculateExpensesUseCase = new CalculateExpensesUseCase();
    this.outputFormatter = outputFormatter;
    this.outputHandler = outputHandler;
  }

  public async process(inputHandler: InputHandler): Promise<CalculationResult> {
    const trips = await inputHandler.read();
    const result = this.calculateExpensesUseCase.execute(trips);

    const formattedOutput = this.outputFormatter.format(result);
    await this.outputHandler.write(formattedOutput);

    if (inputHandler.close) {
      inputHandler.close();
    }

    return result;
  }
}
