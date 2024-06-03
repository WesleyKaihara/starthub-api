import OpenAI from '@analysis/core/entity/OpenAI';

export class GetRandomSuggestions {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      suggestions: {
        type: 'array',
        description:
          'Lista com pelo menos 5 descrições de ideias aleatórias em relação ao projeto com a finalidade de pensar em possíveis caminho que a solução pode prosseguir,  ajudar o empreendedor a pensar fora do seu ambiente e trabalhar de formas diferentes',
        items: {
          type: 'string',
          description:
            'Descrição da ideia condizente com o projeto, sendo aleatória mas sem se distancia muito do contexto. Deve apresentar as partes boas dessa ideia, qual publico alvo iria atingir e como poderia agregar valor para o empreendedor',
        },
      },
    },
    required: ['suggestions'],
  };

  async execute(projectDescription: string): Promise<any> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista na idealização e validação de projetos, com foco em inovação e destaque no mercado.',
        },
        {
          role: 'user',
          content: `Me apresente uma lista com algumas ideias bem aleatórias em relação ao projeto, com o intuito de instigar o empreender a pensar de uma forma diferente e melhorar sua ideia. Por exemplo uma forma diferente de vender, formato diferente, método de distribuição diferente. Seguindo a ideia a seguir: ${projectDescription}.`,
        },
      ],
      functions: [
        {
          name: 'getRandomSuggestions',
          description:
            'Apresente uma lista com pelo menos 5 item e descrições de ideias aleatórias com visões diferentes em relação ao projeto, com informações que auxiliem o empreendedor a pensar de forma diferente do que esta acostumado e assim aprimorar a sua ideia ou encontrar outros caminhos para o projeto. A descrição deve ser completa, com informações sobre possibilidades que a ideia pode alcançar, diferencias e tópicos relacionados a inovação',
          parameters: this.schema,
        },
      ],
      function_call: { name: 'getRandomSuggestions' },
      temperature: 1,
    });

    return JSON.parse(analysis.choices[0].message.function_call.arguments)
      .suggestions;
  }
}
