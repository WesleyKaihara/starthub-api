import { ApiProperty } from '@nestjs/swagger';

export class UpdateLeanCanvasBody {
  @ApiProperty({
    example: 1,
  })
  readonly projectId: number;

  @ApiProperty({
    example: 'Problema encontrado pelas startups',
  })
  readonly problem: string;

  @ApiProperty({
    example: 'Segmentos de clientes das startups',
  })
  readonly customerSegments: string;

  @ApiProperty({
    example: 'Proposta de valor única das startups',
  })
  readonly uniqueValueProposition: string;

  @ApiProperty({
    example: 'Solução proposta pelas startups',
  })
  readonly solution: string;

  @ApiProperty({
    example: 'Canais de distribuição das startups',
  })
  readonly channels: string;

  @ApiProperty({
    example: 'Fontes de receita das startups',
  })
  readonly revenueStreams: string;

  @ApiProperty({
    example: 'Estrutura de custos das startups',
  })
  readonly costStructure: string;

  @ApiProperty({
    example: 'Métricas chave das startups',
  })
  readonly keyMetrics: string;

  @ApiProperty({
    example: 'Vantagem competitiva das startups',
  })
  readonly unfairAdvantage: string;
}
