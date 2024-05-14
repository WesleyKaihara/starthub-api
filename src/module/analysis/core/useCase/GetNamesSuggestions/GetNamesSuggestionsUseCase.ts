import OpenAI from '@analysis/core/entity/OpenAI';

export class GetNamesSuggestions {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        description:
          'Apresentar algumas sugestões de nomes para um projeto de startup, o nome deve ser simples, porém deve ser facilmente lembrado, e representando de forma clara o produto. Podem ser sugestões em português ou em ingles. Deve ser apresentado o motivos para se utilizar esse nome e por que foi gerado dessa forma dentro da descrição',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'Deve retornar o nome sugerido que represente a empresa, e seja fácil de ser lembrado, de preferencia que seja diferente de todas existentes',
            },
            description: {
              type: 'string',
              description:
                'Descreve alguns motivos de se utilizar o nome criado, por que ele foi gerado dessa forma, quais impactos ele pode causar e significado caso seja gerado em ingles',
            },
          },
        },
        minItems: 5,
        maxItems: 5,
      },
    },
    required: ['data'],
  };

  constructor() {}

  async getNamesSuggestions(projectDescription: string): Promise<any[]> {
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
          content: `Preciso de ajuda para criar algumas sugestões de nomes para uma Startup. Também preciso saber o motivo de se utilizar o nome gerado (Exemplo: Este nome tem uma definição clara do produto e permite que seja facilmente lembrada). A ideia é ${projectDescription}.`,
        },
      ],
      functions: [{ name: 'get_name_suggestions', parameters: this.schema }],
      function_call: { name: 'get_name_suggestions' },
      temperature: 1,
    });
    return JSON.parse(analysis.choices[0].message.function_call.arguments).data;
  }

  async execute(projectDescription: string): Promise<any> {
    const namesSuggestions: any[] = [];
    while (namesSuggestions.length < 5) {
      const names = await this.getNamesSuggestions(projectDescription);
      namesSuggestions.push(...names);
    }

    return namesSuggestions;
  }
}
