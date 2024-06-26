import OpenAI from '@analysis/core/entity/OpenAI';

export class GenerateSalesLocationsSuggestion {
  openai = OpenAI.getInstance();
  schema = {
    type: 'object',
    properties: {
      salesLocations: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description:
                'Titulo da forma de venda, exemplo vendas de dados, divulgação nas redes sociais, venda direta, outra',
            },
            description: {
              type: 'string',
              description:
                'Descreva de forma detalhada como o processo de utilização de método pode ser aplicado na ideia informada, e como ele pode ajudar empreendedor, por exemplo ajuda na otimização de tempo do empreendedor devido a facilidade em alcançar pessoas engajadas, contatos dentro do nicho, outros',
            },
          },
        },
      },
    },
    required: ['title', 'description'],
  };

  async generateSalesLocationsSuggestion(
    projectDescription: string,
  ): Promise<any[]> {
    const analysis = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Gostaria de gerar retorno para mim de alguma forma, financeiro, contatos, dados, ou se outras formas. Seja a curto, médio ou logo prazo. Preciso de ajuda para listar algumas formas de divulgar meu projeto, encontrar pessoas interessadas em adquirir ou outras forma de acordo com um objetivo de gerar algum tipo de retorno positivo. A ideia do projeto é ${projectDescription}.`,
        },
      ],
      functions: [
        {
          name: 'generate_sales_locations_suggestions',
          description:
            'Apresentar uma lista com pelo menos 5 distintos itens diferentes apresentando como a ideia informado pode ser vendida e chegar até o cliente final, por exemplo um loja de roupas precisa realizar todo um processo de divulgação por redes sociais para aumentar suas vendas, ou também por meio do contato direto, com alguma plataforma, ou outras formas que achar interessante',
          parameters: this.schema,
        },
      ],
      function_call: { name: 'generate_sales_locations_suggestions' },
      temperature: 0.8,
    });

    return JSON.parse(analysis.choices[0].message.function_call.arguments)
      .salesLocations;
  }

  async execute(projectDescription: string): Promise<any> {
    const salesLocations =
      await this.generateSalesLocationsSuggestion(projectDescription);

    return salesLocations;
  }
}
