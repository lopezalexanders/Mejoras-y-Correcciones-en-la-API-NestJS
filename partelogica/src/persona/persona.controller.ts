import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Persona } from './entities/persona.entity';
import { plainToInstance } from 'class-transformer';

@Controller('api/v1/persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva Persona' })
  @ApiResponse({
    status: 201,
    description: 'Persona creada',
    type: Persona,
  })
  @ApiResponse({ status: 400, description: 'Datos invalidos' })
  async create(@Body() createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const nuevaPersona = await this.personaService.create(createPersonaDto);
    return plainToInstance(Persona, nuevaPersona);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Personas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Personas',
    type: Persona,
  })
  async findAll(): Promise<Persona[]> {
    const personas = await this.personaService.findAll();
    return plainToInstance(Persona, personas);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Persona por ID' })
  @ApiResponse({
    status: 200,
    description: 'Persona encontrada',
    type: Persona,
  })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async findOne(@Param('id') id: string): Promise<Persona> {
    const persona = await this.personaService.findOne(+id);
    return plainToInstance(Persona, persona);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Persona por ID' })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada',
    type: Persona,
  })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const personaActualizada = await this.personaService.update(
      +id,
      updatePersonaDto,
    );
    return plainToInstance(Persona, personaActualizada);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Persona por ID' })
  @ApiResponse({ status: 204, description: 'Persona eliminada' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async remove(@Param('id') id: string): Promise<Persona> {
    const personaEliminada = await this.personaService.remove(+id);
    return plainToInstance(Persona, personaEliminada);
  }
}
