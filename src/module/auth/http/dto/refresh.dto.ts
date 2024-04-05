import { ApiProperty } from '@nestjs/swagger';

export default class RefreshDto {
  @ApiProperty({
    example: 'token',
  })
  readonly refreshToken: string;
}
