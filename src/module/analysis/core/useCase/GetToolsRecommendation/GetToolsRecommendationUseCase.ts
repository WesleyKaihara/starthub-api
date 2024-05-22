import OpenAI from '@analysis/core/entity/OpenAI';

export class GetToolsRecommendation {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      tools: {
        type: 'array',
        description:
          'Apresente algumas sugestões de ferramentas que podem ser utilizadas durante o desenvolvimento do projeto da startup. Estas ferramentas podem incluir softwares, plataformas online, frameworks, entre outros recursos. As sugestões devem ser selecionadas com base nas necessidades específicas da empresa, no estágio atual do projeto e nos objetivos de curto e longo prazo. Além disso, fornecer uma análise detalhada sobre cada ferramenta recomendada, incluindo seus principais recursos, funcionalidades, vantagens competitivas, limitações e possíveis casos de uso e quais são os impactos e benefícios que ela pode trazer para o desenvolvimento.',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'O nome da ferramenta recomendada para auxiliar no desenvolvimento do projeto da startup.',
            },
            description: {
              type: 'string',
              description:
                'Uma descrição detalhada da ferramenta recomendada, destacando seus principais recursos, funcionalidades e quais benéficos ela pode entregar para o empreendedor. Destacar bem quais são os benefícios de se utilizar essa ferramenta',
            },
          },
        },
      },
    },
    required: ['tools'],
  };

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
          content: `Preciso de ajuda para encontrar algumas ferramentas que podem auxiliar durante o desenvolvimento do projeto da startup. A ideia é ${projectDescription}.`,
        },
      ],
      functions: [
        {
          name: 'get_tools_recommendations',
          description:
            'Liste pelo menos 5 ferramentas para utilizar durante o desenvolvimento do projeto, essas devem ser de baixo custo devido a necessidade dos pequenos empreendimentos. Também deve apresentar os motivos de se utilizar a ferramenta informa, por exemplo quais benefícios ela entrega a longo, médio ou curto prazo. As ferramentas devem apresentar propostas distintas, ou seja, não deve apresentar ferramentas para resolver o mesmo problema',
          parameters: this.schema,
        },
      ],
      function_call: { name: 'get_tools_recommendations' },
      temperature: 1,
    });

    return JSON.parse(analysis.choices[0].message.function_call.arguments)
      .tools;
  }

  async execute(projectDescription: string): Promise<any> {
    const tools = await this.getToolsRecommendation(projectDescription);

    return tools;
  }
}
