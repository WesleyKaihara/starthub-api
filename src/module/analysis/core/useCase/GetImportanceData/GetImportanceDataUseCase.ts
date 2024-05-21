import OpenAI from '@analysis/core/entity/OpenAI';

export class GetImportanceData {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      importanceData: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description:
                'Titulo da informação que pode ser relevante para o desenvolvimento do projeto, por exemplo valor médio dos produtos oferecidos por outras empresas. O retorno deve ser em português',
            },
            description: {
              type: 'string',
              description:
                'Descrição de como essa informação pode ser relevante para o desenvolvimento do projeto',
            },
          },
        },
      },
    },
    required: ['importanceData'],
  };

  async getImportanceData(projectDescription: string): Promise<any[]> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Quero um lista de dados que podem ser levantados para um desenvolvimento melhor da minha ideia, como por exemplo a importância de ter um valor que seja significativo para o mercado, se for mais caro deve entregar mais que a concorrência. Quero o levantamento APENAS do Tópico e não o dado final. Segue as informações do projeto: ${projectDescription}.`,
        },
      ],
      functions: [
        {
          name: 'get_importance_of_data',
          description:
            'Apresentar uma lista de informações, com pelo menos 5 itens ,que podem ser relevantes para a ideia informada, exemplo quantidade de pessoas que praticam esportes para um produto relacionado a saúde. Se o produto for um produto físico entender o mercado atual e valor da concorrência se existir. Não quero o valor final do requisito, apenas o nome dos tópicos e qual a importância de realizar o levantamento desse tópico',
          parameters: this.schema,
        },
      ],
      function_call: { name: 'get_importance_of_data' },
      temperature: 0.9,
    });

    return JSON.parse(analysis.choices[0].message.function_call.arguments)
      .importanceData;
  }

  async execute(projectDescription: string): Promise<any> {
    const importanceData = await this.getImportanceData(projectDescription);

    return importanceData;
  }
}
