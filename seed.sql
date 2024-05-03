INSERT INTO StartHub.discussion (title, context, createdAt)
VALUES
    ('IA para idealização de projetos',
     'A inteligência artificial é um campo de estudo multidisciplinar que abrange varias áreas do conhecimento. É também um conjunto de novas tecnologias que permitem aos aparelhos smart executarem várias funções avançadas de modo quase autônomo, representanto um marco histórico na computação moderna.',
     NOW()
    );

INSERT INTO StartHub.interaction (discussionId, message, createdAt)
VALUES
    (1, '', NOW()),
    (1, '', NOW()),
    (1, '', NOW()),
    (1, '', NOW()),
    (1, '', NOW()),
    (1, '', NOW()),
    (1, '', NOW()),
    (1, '', NOW()),
    (1, '', NOW());