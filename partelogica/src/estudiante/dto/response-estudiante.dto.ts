import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class EstudianteResponseDto {
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  planestudio: string;

  @IsInt()
  @IsNotEmpty()
  personaId: number;
}
