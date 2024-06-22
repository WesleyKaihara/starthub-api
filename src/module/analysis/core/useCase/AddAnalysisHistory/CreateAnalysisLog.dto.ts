import { ApiProperty } from '@nestjs/swagger';

export class AddAnalysisHistoryBody {
  @ApiProperty({
    example: 'Projeto de gerenciamento de agendamento de aluguel de veículos',
  })
  readonly request: string;
  @ApiProperty({
    example: 'Resultado gerado pela inteligencia artificial',
  })
  readonly result: string;
}
