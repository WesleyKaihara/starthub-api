import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { MIN_CHARACTERES_NAME } from './userRole.constant';

export class UpdateUserRoleDto {
  @ApiProperty({
    example: 'Admin',
  })
  readonly name: string;
}

export const UpdateUserRoleDtoSchema = z
  .object({
    name: z.string().min(MIN_CHARACTERES_NAME, {
      message: `User role name must have at least ${MIN_CHARACTERES_NAME} characters`,
    }),
  })
  .strict();
