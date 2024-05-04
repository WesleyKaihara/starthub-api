import OpenAI from '@analysis/core/entity/OpenAI';

export class GetToolsRecommendation {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        description:
          'Apresentar algumas sugestões de ferramentas para utilizar durante o desenvolvimento do projeto, podendo ser softwares ou ideias de planilhas, as sugestões devem ser uteis para a evolução e organização do projeto. Também deve ser apresentado os motivos da escolha da ferramenta, apresentando o motivo de utilizar, valor de possíveis planos e quais empresas já utilizam essa ferramenta',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'Deve retornar o nome da ferramenta sugerida para auxiliar a startup durante as possíveis atividades que serão realizadas, como planejamento, desenvolvimento do produto, organização e controle de ativos',
            },
            description: {
              type: 'string',
              description:
                'Descreve alguns motivos de se utilizar a ferramenta encontrada, apresentando os benefícios de se utilizar, como ela pode ajudar, quais empresas utilizam essa ferramenta e por quais motivo. Se existir custo também deve ser apresentado',
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

  async getToolsRecommendation(projectDescription: string): Promise<any[]> {
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
          content: `Preciso de ajuda para encontrar algumas ferramentas que podem auxiliar durante o desenvolvimento do projeto de acordo com o escopo apresentado da ideia. A ideia é ${projectDescription}.`,
        },
      ],
      functions: [
        { name: 'get_tools_recommendations', parameters: this.schema },
      ],
      function_call: { name: 'get_tools_recommendations' },
      temperature: 1,
    });
    return JSON.parse(analysis.choices[0].message.function_call.arguments).data;
  }

  async execute(projectDescription: string): Promise<any> {
    const toolsRecommendation: any[] = [];

    while (toolsRecommendation.length < 5) {
      const tools = await this.getToolsRecommendation(projectDescription);
      toolsRecommendation.push(...tools);
    }

    return { data: toolsRecommendation };
  }
}
