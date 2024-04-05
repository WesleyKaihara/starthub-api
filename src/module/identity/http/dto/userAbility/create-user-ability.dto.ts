import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { MIN_CHARACTERES_NAME } from './@userAbility.constants';

export class CreateUserAbilityDto {
  @ApiProperty({
    example: 123,
  })
  readonly userId: number;
  @ApiProperty({
    example: 'User',
  })
  readonly name: string;
}

export const CreateUserAbilityDtoSchema = z
  .object({
    name: z.string().min(MIN_CHARACTERES_NAME, {
      message: `User ability must have at least ${MIN_CHARACTERES_NAME} characters`,
    }),
  })
  .strict();
