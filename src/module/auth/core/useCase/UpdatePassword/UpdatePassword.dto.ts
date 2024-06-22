import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordBody {
  @ApiProperty({
    example: 'OldPassword123',
  })
  readonly oldPassword: string;

  @ApiProperty({
    example: 'NewPassword123',
  })
  readonly newPassword: string;
}
