import OpenAI from '@analysis/core/entity/OpenAI';

export class GetSimilarProposals {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        description:
          'Informar projetos existentes no mercado que possuem uma ideia próxima ou compartilham características relevantes com a ideia de startup fornecida. Os projetos devem ser reais e preferencialmente resolvam uma dor do cliente. Podem ser produtos de qualquer lugar do mundo.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'Nome do projeto ou produto existente que é similar à ideia de startup informada. Deve ser uma empresa ou produto real, preferencialmente com presença internacional.',
            },
            description: {
              type: 'string',
              description:
                'Descrição detalhada do projeto encontrado, incluindo seu funcionamento, diferenciais em relação a outras soluções no mercado, público-alvo principal e elementos que podem ser aproveitados na ideia de startup informada.',
            },
          },
        },
        minItems: 5,
        maxItems: 5,
      },
    },
    required: ['similarProposals'],
  };

  constructor() {}

  async generateSimilarProposals(projectDescription: string): Promise<any[]> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista no desenvolvimento de projetos e startups, com conhecimento amplo sobre o mercado e tendências de inovação.',
        },
        {
          role: 'user',
          content: `Preciso de ajuda para identificar projetos ou produtos existentes que sejam similares à minha ideia de startup. A ideia é ${projectDescription}. Gostaria de receber informações sobre projetos reais e bem-sucedidos que compartilhem características relevantes com a minha proposta. Por favor, forneça exemplos de projetos de todo o mundo, de preferência com presença internacional.`,
        },
      ],
      functions: [{ name: 'get_similar_proposals', parameters: this.schema }],
      function_call: { name: 'get_similar_proposals' },
      temperature: 1,
    });
    return JSON.parse(analysis.choices[0].message.function_call.arguments).data;
  }

  async execute(projectDescription: string): Promise<any> {
    const proposals: any[] = [];

    while (proposals.length < 5) {
      const newProposals =
        await this.generateSimilarProposals(projectDescription);
      proposals.push(...newProposals);
    }

    return { data: proposals };
  }
}
