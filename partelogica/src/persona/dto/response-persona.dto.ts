import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResponsePersonaDto {
  @ApiProperty({
    example: 'Lopez',
    description: 'Apellido Paterno',
  })
  @IsString({ message: 'Paterno debe ser cadena' })
  @IsNotEmpty({ message: 'Paterno no debe ser vacio' })
  paterno: string;

  @ApiProperty({
    example: 'Mamani',
    description: 'Apellido Materno',
  })
  @IsString({ message: 'Materno debe ser cadena' })
  @IsOptional()
  materno: string;

  @ApiProperty({
    example: 'Martin',
    description: 'Nombres',
  })
  @IsString({ message: 'Nombres debe ser cadena' })
  @IsNotEmpty({ message: 'Nombres no debe ser vacio' })
  nombres: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Fecha de Nacimiento',
  })
  @IsString({ message: 'Fecha de Nacimiento debe ser cadena' })
  @IsNotEmpty({ message: 'Fecha de Nacimiento no debe ser vacio' })
  fechanacimiento: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 742',
    description: 'Direccion',
  })
  @IsString({ message: 'Direccion debe ser cadena' })
  @IsOptional()
  direccion: string;

  @ApiProperty({
    example: 123456789,
    description: 'Telefono',
  })
  @IsInt({ message: 'Telefono debe ser entero' })
  @IsOptional()
  telefono: number;
}
