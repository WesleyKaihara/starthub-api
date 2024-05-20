import { ApiProperty } from '@nestjs/swagger';

export class GetImportanceDataBody {
  @ApiProperty({
    example:
      'StartHub é uma plataforma destinada a startups, possui diversas funcionalidades destinadas a auxiliar no processo de idealização e validação de ideias',
  })
  readonly projectDescription: string;
}
