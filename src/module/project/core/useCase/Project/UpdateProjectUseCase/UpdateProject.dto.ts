import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

const PROJECT_VALIDATION = {
  MIN_CHARACTERS_NAME: 3,
  MIN_CHARACTERS_DESCRIPTION: 10,
};

export class UpdateProjectDto {
  @ApiProperty({
    example: 'StartHub',
  })
  readonly name: string;
  @ApiProperty({
    example:
      'Plataforma destina a auxiliar no processo inicial de desenvolvimento de startups',
  })
  readonly description: string;
  @ApiProperty({
    example: false,
  })
  readonly private: boolean;
}

export const UpdateProjectDtoSchema = z
  .object({
    name: z.string().min(PROJECT_VALIDATION.MIN_CHARACTERS_NAME, {
      message: `Project name must have at least ${PROJECT_VALIDATION.MIN_CHARACTERS_NAME} characters`,
    }),
    description: z.string().min(PROJECT_VALIDATION.MIN_CHARACTERS_DESCRIPTION, {
      message: `Project description must have at least ${PROJECT_VALIDATION.MIN_CHARACTERS_DESCRIPTION} characters`,
    }),
    private: z.boolean(),
  })
  .strict();
