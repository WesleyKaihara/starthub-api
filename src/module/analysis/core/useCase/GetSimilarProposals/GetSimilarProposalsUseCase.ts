import OpenAI from '@analysis/core/entity/OpenAI';

export class GetSimilarProposals {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        description:
          'Informar cinco projetos existentes no mercado que possuem uma ideia próxima ou que possuem algumas itens apresentados na ideia de startup. Devem ser empresas reais e de preferencia que resolvam a dor do cliente. Podem ser produtos de todo o mundo. Se possível apresentar pelo menos 2 produtos de fora do Brasil',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'Poderia informar qual o nome do projeto existente que seja similar ao informado, deve ser um produto ou empresa que realmente existe no brasil ou em outros países',
            },
            description: {
              type: 'string',
              description:
                'Poderia detalhar algumas informações sobre o projeto encontrado, como seu funcionamento, características que tornar esse projeto diferente dos demais, seu principal publico alvo e quais itens podem ser aproveitadas na ideia informada.',
            },
          },
        },
      },
    },
    required: ['similarProposals'],
  };

  constructor() {}

  async execute(): Promise<any> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista no desenvolvimento de projetos, com foco em inovação e conhece diversos projetos ao redor do mundo, produtos físicos e digitais',
        },
        {
          role: 'user',
          content: `Me apresente alguns projetos ou produtos existentes relacionados a uma plataforma destinada a auxiliar startups no processo de validação de ideias, o resultado deve ser escrito em português, mas nã precisa retornar apenas empresas brasileirass`,
        },
      ],
      functions: [{ name: 'get_similar_proposals', parameters: this.schema }],
      function_call: { name: 'get_similar_proposals' },
      temperature: 2,
    });
    return JSON.parse(analysis.choices[0].message.function_call.arguments);
  }
}
