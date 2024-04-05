import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreatePermissionDto {
  @ApiProperty({
    example: true,
  })
  readonly read: boolean;
  @ApiProperty({
    example: true,
  })
  readonly write: boolean;
  @ApiProperty({
    example: true,
  })
  readonly delete: boolean;
}

export const CreatePermissionDtoSchema = z
  .object({
    read: z.boolean(),
    write: z.boolean(),
    delete: z.boolean(),
  })
  .strict();
