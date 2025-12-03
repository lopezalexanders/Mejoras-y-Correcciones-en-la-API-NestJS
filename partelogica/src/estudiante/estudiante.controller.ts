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
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { EstudianteResponseDto } from './dto/response-estudiante.dto';

@ApiTags('Estudiante')
@ApiExtraModels(CreateEstudianteDto, UpdateEstudianteDto, EstudianteResponseDto)
@Controller('api/v1/estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Estudiante' })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado',
    type: CreateEstudianteDto,
  })
  @ApiResponse({ status: 400, description: 'Datos invalidos' })
  async create(
    @Body() createEstudianteDto: CreateEstudianteDto,
  ): Promise<CreateEstudianteDto> {
    const nuevoEstudiante =
      await this.estudianteService.create(createEstudianteDto);
    return plainToInstance(CreateEstudianteDto, nuevoEstudiante);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Estudiantes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Estudiantes',
    type: EstudianteResponseDto,
  })
  async findAll(): Promise<EstudianteResponseDto[]> {
    const estudiantes = await this.estudianteService.findAll();
    return plainToInstance(EstudianteResponseDto, estudiantes);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Estudiantes por ID' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado',
    type: EstudianteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async findOne(@Param('id') id: string): Promise<EstudianteResponseDto> {
    const estudiante = await this.estudianteService.findOne(+id);
    return plainToInstance(EstudianteResponseDto, estudiante);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Estudiantes por ID' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado',
    type: EstudianteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<UpdateEstudianteDto> {
    const estudianteActualizado = await this.estudianteService.update(
      +id,
      updateEstudianteDto,
    );
    return plainToInstance(UpdateEstudianteDto, estudianteActualizado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Estudiantes por ID' })
  @ApiResponse({ status: 204, description: 'Estudiante eliminado' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  async remove(@Param('id') id: string): Promise<EstudianteResponseDto> {
    const estudianteEliminado = await this.estudianteService.remove(+id);
    return plainToInstance(EstudianteResponseDto, estudianteEliminado);
  }
}
