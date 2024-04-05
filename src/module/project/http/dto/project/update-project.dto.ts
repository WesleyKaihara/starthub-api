import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import {
  MIN_CHARACTERS_NAME,
  MIN_CHARACTERS_DESCRIPTION,
} from './@project.constant';

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
    name: z.string().min(MIN_CHARACTERS_NAME, {
      message: `Project name must have at least ${MIN_CHARACTERS_NAME} characters`,
    }),
    description: z.string().min(MIN_CHARACTERS_DESCRIPTION, {
      message: `Project description must have at least ${MIN_CHARACTERS_DESCRIPTION} characters`,
    }),
    private: z.boolean(),
  })
  .strict();
