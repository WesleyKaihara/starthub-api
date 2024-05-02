import OpenAI from '@analysis/core/entity/OpenAI';

export class GetProjectSugestions {
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
            nextStep: {
              type: 'string',
              description:
                'Qual poderia ser o proximo passo a ser executado para alcançar o resultado esperado',
            },
            benefits: {
              type: 'string',
              description:
                'Qual o principal beneficio essa sugestão irá resultar',
            },
          },
        },
      },
    },
    required: ['sugestions'],
  };

  constructor() {}

  async execute(): Promise<any> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista na idealização e validação de projetos, com foco em inovação e destaque no mercado',
        },
        {
          role: 'user',
          content: `Me de algumas sugestões relacionadas a uma plataforma com foco na idealização e as etapas iniciais de uma startup`,
        },
      ],
      functions: [{ name: 'get_sugestions', parameters: this.schema }],
      function_call: { name: 'get_sugestions' },
      temperature: 1.5,
    });
    return JSON.parse(analysis.choices[0].message.function_call.arguments);
  }
}
