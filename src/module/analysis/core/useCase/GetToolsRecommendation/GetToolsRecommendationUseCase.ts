import OpenAI from '@analysis/core/entity/OpenAI';

export class GetToolsRecommendation {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        description:
          'Apresente algumas sugestões de ferramentas que podem ser utilizadas durante o desenvolvimento do projeto da startup. Estas ferramentas podem incluir softwares, plataformas online, frameworks, entre outros recursos. As sugestões devem ser selecionadas com base nas necessidades específicas da empresa, no estágio atual do projeto e nos objetivos de curto e longo prazo. Além disso, fornecer uma análise detalhada sobre cada ferramenta recomendada, incluindo seus principais recursos, funcionalidades, vantagens competitivas, limitações e possíveis casos de uso.',
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
                'Uma descrição detalhada da ferramenta recomendada, destacando seus principais recursos, funcionalidades e vantagens competitivas em relação a outras opções disponíveis no mercado.',
            },
            advantages: {
              type: 'string',
              description:
                'As vantagens competitivas da ferramenta recomendada, incluindo sua capacidade de resolver problemas específicos, aumentar a eficiência operacional, reduzir custos, melhorar a qualidade do produto final, entre outros benefícios.',
            },
            limitations: {
              type: 'string',
              description:
                'As limitações ou desafios associados ao uso da ferramenta recomendada, como possíveis restrições de funcionalidade, compatibilidade com outros sistemas, curva de aprendizado, custos adicionais, entre outros aspectos importantes a serem considerados.',
            },
            useCases: {
              type: 'string',
              description:
                'Alguns casos de uso práticos da ferramenta recomendada, destacando exemplos reais de sua aplicação em projetos semelhantes, histórias de sucesso de clientes, depoimentos positivos, entre outras evidências que comprovem sua eficácia e relevância para a startup.',
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
          content: `Preciso de ajuda para encontrar algumas ferramentas que podem auxiliar durante o desenvolvimento do projeto da startup. A ideia é ${projectDescription}.`,
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
