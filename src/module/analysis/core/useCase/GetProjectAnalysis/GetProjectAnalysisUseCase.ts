import OpenAI from '@analysis/core/entity/OpenAI';
import { LeanCanvasRepository } from '@project/shared/persistence';

export class GetProjectAnalysis {
  constructor(private readonly leanCanvasRepository: LeanCanvasRepository) {}

  openai = OpenAI.getInstance();

  async generateProjectAnalysis(
    problem: string,
    customerSegments: string,
    uniqueValueProposition: string,
    solution: string,
    channels: string,
    revenueStreams: string,
    costStructure: string,
    keyMetrics: string,
    unfairAdvantage: string,
  ): Promise<any[]> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Especialista no desenvolvimento de projetos `,
        },
      ],
      functions: [
        {
          name: 'generate_project_analysis',
          parameters: {
            type: 'object',
            properties: {
              content: {
                type: 'string',
                description: `Preciso de ajuda para realizar a análise de uma ideia seguindo as boas práticas de desenvolvimento de um projeto e conhecendo os projetos que existiram em algum momento ou estão em funcionamento. Levantar pontos que podem ser melhorados, relacionar os pontos do lean canvas para criar sugestões e identificar quais cenários provavelmente podem resultar na resolução das dores do cliente e quais devem ser aprimoradas. O problema identificado foi ${problem}, será destinada aos seguintes clientes ${customerSegments}. Com a proposta de valor ${uniqueValueProposition}, a solução é basicamente ${solution}. Será distribuída por meio dos canais ${channels}. As formas de receita da solução será ${revenueStreams}. Com os seguintes custos ${costStructure}. As métricas chave para a solução serão ${keyMetrics} e as principais vantagens de mercado definidas foram ${unfairAdvantage}`,
              },
            },
          },
        },
      ],
      function_call: { name: 'generate_project_analysis' },
      temperature: 1.2,
    });

    return JSON.parse(analysis.choices[0].message.function_call.arguments)
      .content;
  }

  async execute(projectId: number): Promise<any> {
    const leanCanvas =
      await this.leanCanvasRepository.getLeanCanvasByProject(projectId);

    const analysis = await this.generateProjectAnalysis(
      leanCanvas.problem,
      leanCanvas.customerSegments,
      leanCanvas.uniqueValueProposition,
      leanCanvas.solution,
      leanCanvas.channels,
      leanCanvas.revenueStreams,
      leanCanvas.costStructure,
      leanCanvas.keyMetrics,
      leanCanvas.unfairAdvantage,
    );

    return analysis;
  }
}
