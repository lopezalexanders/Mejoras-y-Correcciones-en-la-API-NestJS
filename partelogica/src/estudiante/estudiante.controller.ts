import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Estudiante } from './entities/estudiante.entity';
import { plainToInstance } from 'class-transformer';

@ApiTags('Estudiante')
@Controller('api/v1/estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Estudiante' })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado',
    type: Estudiante,
  })
  @ApiResponse({ status: 400, description: 'Datos invalidos' })
  async create(
    @Body() createEstudianteDto: CreateEstudianteDto,
  ): Promise<Estudiante> {
    const nuevoEstudiante =
      await this.estudianteService.create(createEstudianteDto);
    return plainToInstance(Estudiante, nuevoEstudiante);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Estudiantes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Estudiantes',
    type: Estudiante,
  })
  async findAll(): Promise<Estudiante[]> {
    const estudiantes = await this.estudianteService.findAll();
    return plainToInstance(Estudiante, estudiantes);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Estudiantes por ID' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado',
    type: Estudiante,
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async findOne(@Param('id') id: string): Promise<Estudiante> {
    const estudiante = await this.estudianteService.findOne(+id);
    return plainToInstance(Estudiante, estudiante);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Estudiantes por ID' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado',
    type: Estudiante,
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<Estudiante> {
    const estudianteActualizado = await this.estudianteService.update(
      +id,
      updateEstudianteDto,
    );
    return plainToInstance(Estudiante, estudianteActualizado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Estudiantes por ID' })
  @ApiResponse({ status: 204, description: 'Estudiante eliminado' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async remove(@Param('id') id: string): Promise<Estudiante> {
    const estudianteEliminado = await this.estudianteService.remove(+id);
    return plainToInstance(Estudiante, estudianteEliminado);
  }
}
