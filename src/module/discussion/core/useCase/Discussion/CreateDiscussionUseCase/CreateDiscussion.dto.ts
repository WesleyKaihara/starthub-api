import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscussionBody {
  @ApiProperty({
    example: 'IA para idealização de projetos',
  })
  readonly title: string;
  @ApiProperty({
    example:
      'A inteligência artificial é um campo de estudo multidisciplinar que abrange varias áreas do conhecimento. É também um conjunto de novas tecnologias que permitem aos aparelhos smart executarem várias funções avançadas de modo quase autônomo, representanto um marco histórico na computação moderna.',
  })
  readonly context: string;

  @ApiProperty({
    example: 1,
  })
  readonly projectId?: number;
}
