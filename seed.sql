INSERT INTO StartHub.discussion (title, context, createdAt)
VALUES
    ('IA para idealização de projetos',
     'A inteligência artificial é um campo de estudo multidisciplinar que abrange varias áreas do conhecimento. É também um conjunto de novas tecnologias que permitem aos aparelhos smart executarem várias funções avançadas de modo quase autônomo, representanto um marco histórico na computação moderna.',
     NOW()
    );

INSERT INTO StartHub.interaction (discussionId, message, createdAt)
VALUES
    (1, 'Analisando dados de projetos anteriores, a IA consegue identificar padrões e prever resultados de projetos com precisão, facilitando a tomada de decisões e evitando riscos', NOW()),
    (1, 'Com a programação de projetos e previsão de demandas futuras, a IA consegue alocar melhor os recursos para que sejam utilizados de forma mais eficiente, evitando gargalos e melhorando a eficiência operacional', NOW()),
    (1, 'A IA consegue avaliar e mitigar riscos com base no histórico dos dados apresentados, identificando padrões anômalos nos dados que podem indicar possíveis problemas de segurança, ou exposição a riscos. Isso inclui a detecção de atividades suspeitas, protegendo os dados e garantindo a integridade do projeto, bem como prever oportunidades de melhorias', NOW());

-------------------------------------------

INSERT INTO StartHub.leanCanvas (projectId,
                                 problem, customerSegments, uniqueValueProposition, solution, channels,
                                 revenueStreams, costStructure, keyMetrics, unfairAdvantage, createdAt)
VALUES (1,
        'A Starthub busca auxiliar no processo de idealização e validação de startups. De acordo com nossas pesquisas foi verificado que em 2023 a quantidade de startups utrapassou 12 mil empresas, com um total de investimento superando os 3
bilhões de dolares segundo as pesquisas realizadas pelo Sebrae. Dentre os principais problemas apresentados por pesquisas de grandes empresas como a CB Insights, que possui grande influencia dentro do mercado de pesquisas gerais, um dos maiores erros é a falta de market fit, ou seja,
quando o produto não resolve a dor dos clientes de maneira correta',
        'Pessoas interessadas em criar uma startup, ou que gostaria me aperfeiçoar suas idéias',
        'Realização de análises sobre a ideia da startup, geração de sugestões baseada no contexto do projeto',
        'Utilização de métodologias e inteligência artificial para geração de insights para o empreendedor, gerando possiveis cenários e sugestões para seu projeto',
        'Redes Sociais, Contato Direto',
        'Venda de planos dentro da plataforma para continuar a realização das análises, inicialmente a quantidade de análises é limitada',
        'Utilização da OpenAI para geração das análises, Infraestrtura de banco de dados e Servidor',
        'Quantidade de utilizações por usuário, taxa de satisfação dos usuários',
        'Geração de Análises e criação de sugestões de forma simples e baseada em métodologias reais e validadas',
        now()
        );