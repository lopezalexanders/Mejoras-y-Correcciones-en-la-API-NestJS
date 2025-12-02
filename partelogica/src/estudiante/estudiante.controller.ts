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
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.create(createEstudianteDto);
  }

  @ApiOperation({ summary: 'Listar Estudiantes' })
  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudianteService.update(+id, updateEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
