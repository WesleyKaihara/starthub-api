import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectBody {
  @IsNotEmpty({ message: 'Project name cannot be empty' })
  @IsString({ message: 'Project name must be a string' })
  @ApiProperty({
    example: 'StartHub',
  })
  readonly name: string;

  @IsNotEmpty({ message: 'Project description cannot be empty' })
  @IsString({ message: 'Project description must be a string' })
  @ApiProperty({
    example:
      'Plataforma destina a auxiliar no processo inicial de desenvolvimento de startups',
  })
  readonly description: string;

  @ApiProperty({
    example: 1,
  })
  readonly userId: number;

  @ApiProperty({
    example: true,
  })
  readonly ative: boolean;

  @ApiProperty({
    example: '',
  })
  readonly image?: string;
}
