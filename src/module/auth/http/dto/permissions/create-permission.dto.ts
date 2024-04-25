import { ApiProperty } from '@nestjs/swagger';
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
