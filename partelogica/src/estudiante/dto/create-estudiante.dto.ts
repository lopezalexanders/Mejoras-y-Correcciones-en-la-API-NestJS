import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @ApiProperty({
    example: 'SIS',
    description: 'Plan de Estudio de Ingenieria de sistemas',
  })
  @IsString()
  @IsNotEmpty()
  planestudio: string;

  @ApiProperty({
    example: '1',
    description: 'ID de la persona asociada al estudiante',
  })
  @IsInt()
  @IsNotEmpty()
  personaId: number;
}
