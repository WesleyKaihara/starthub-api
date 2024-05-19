import OpenAI from '@analysis/core/entity/OpenAI';

export class GetMarketTendencies {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        description: 'Enviar três sugestões relacionadas ao projeto',
        items: {
          type: 'object',
          properties: {
            strategy: {
              type: 'string',
              description:
                'Estratégia recomendada para aumentar o sucesso do projeto. Descreva de forma extremamente detalhada os benefícios de seguir essa estratégia, como ela pode ser realizada e exemplos de empresas e projetos que a implementaram com sucesso.',
            },
            timeline: {
              type: 'string',
              description:
                'Tempo recomendado para implementar a estratégia proposta. Forneça um cronograma detalhado das etapas e atividades envolvidas.',
            },
            keyConsiderations: {
              type: 'string',
              description:
                'Principais pontos de atenção ao implementar a estratégia. Identifique possíveis desafios e obstáculos e sugira maneiras de superá-los.',
            },
            successIndicators: {
              type: 'string',
              description:
                'Indicadores de sucesso para avaliar o progresso e o desempenho do projeto ao seguir a estratégia proposta. Liste os principais marcos e resultados esperados.',
            },
          },
          minItems: 1,
          maxItems: 1,
        },
      },
    },
    required: ['suggestions'],
  };

  constructor() {}

  async getMarketTendencies(): Promise<any[]> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista na idealização e validação de projetos, com foco em inovação e destaque no mercado.',
        },
        {
          role: 'user',
          content: `Me dê sugestões extremamente detalhadas relacionadas a uma estratégia para aumentar o sucesso do projeto. Quero saber os benefícios de seguir essa estratégia, como ela pode ser realizada, exemplos de empresas e projetos bem-sucedidos, o tempo recomendado para implementação, os principais pontos de atenção e os indicadores de sucesso.`,
        },
      ],
      functions: [{ name: 'getMarketTendencies', parameters: this.schema }],
      function_call: { name: 'getMarketTendencies' },
      temperature: 0.8,
      max_tokens: 1000,
    });

    return JSON.parse(analysis.choices[0].message.function_call.arguments).data;
  }

  async execute(): Promise<any> {
    const suggestions: any[] = [];

    while (suggestions.length < 3) {
      const newSuggestions = await this.getMarketTendencies();
      suggestions.push(...newSuggestions);
    }

    return { data: suggestions.slice(0, 3) };
  }
}
