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
            keyWords: {
              type: 'array',
              description:
                'Apresentar uma lista com pelo menos 8 itens de palavras chaves para a ideia, esta deve apresentar palavras que representam a startup de forma clara e agreguem valor para o empreender e seus negócio.',
              items: {
                type: 'string',
                description:
                  'Deve ser gerada uma palavra chave que agregue valor ao negócio e represente de forma clara o que deseja ser resolvido',
              },
            },
          },
        },
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
          content: `Preciso de ajuda para criar uma lista com sugestões de nomes para a Startup. Também preciso saber o motivo de se utilizar o nome gerado (Exemplo: Este nome tem uma definição clara do produto e permite que seja facilmente lembrada). A ideia é ${projectDescription}.`,
        },
      ],
      functions: [
        {
          name: 'get_name_suggestions',
          description:
            'Apresentar uma lista com pelo menos 5 sugestões de nomes para a startup, quero nomes que sejam significativos e que representem o que a empresa irá realizar. Também deve ser apresentado o motivo de ter escolhido o nome, por exemplo, representar de forma clara os problemas que a startup resolve. Nome deve ser simples, fácil de se comunicar e não tenha duplo sentido. No retorna também deve haver uma lista com pelo menos 10 palavras chaves para cada geração que representam de forma clara os valores da ideia, quais dores pretende resolver e palavras que chamem a atenção de possíveis investidores',
          parameters: this.schema,
        },
      ],
      function_call: { name: 'get_name_suggestions' },
      temperature: 0.9,
    });
    return JSON.parse(analysis.choices[0].message.function_call.arguments).data;
  }

  async execute(projectDescription: string): Promise<any> {
    const namesSuggestions = await this.getNamesSuggestions(projectDescription);
    return namesSuggestions;
  }
}
