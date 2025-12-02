import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonaDto {
  @IsString({ message: 'Paterno debe ser cadena' })
  @IsNotEmpty({ message: 'Paterno no debe ser vacio' })
  paterno: string;

  @IsString()
  @IsOptional()
  materno: string;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  fechanacimiento: string;

  @IsString()
  @IsOptional()
  direccion: string;

  @IsInt({ message: 'Telefono debe ser entero' })
  @IsOptional()
  telefono: number;
}
