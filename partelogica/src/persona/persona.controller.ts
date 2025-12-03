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
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
//import { Persona } from './entities/persona.entity';
import { plainToInstance } from 'class-transformer';
import { ResponsePersonaDto } from './dto/response-persona.dto';

@ApiTags('Persona')
@ApiExtraModels(CreatePersonaDto, UpdatePersonaDto, ResponsePersonaDto)
@Controller('api/v1/persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva Persona' })
  @ApiResponse({
    status: 201,
    description: 'Persona creada',
    type: ResponsePersonaDto,
  })
  @ApiResponse({ status: 400, description: 'Datos invalidos' })
  async create(
    @Body() createPersonaDto: CreatePersonaDto,
  ): Promise<ResponsePersonaDto> {
    const nuevaPersona = await this.personaService.create(createPersonaDto);
    return plainToInstance(ResponsePersonaDto, nuevaPersona);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Personas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Personas',
    type: ResponsePersonaDto,
  })
  async findAll(): Promise<ResponsePersonaDto[]> {
    const personas = await this.personaService.findAll();
    return plainToInstance(ResponsePersonaDto, personas);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Persona por ID' })
  @ApiResponse({
    status: 200,
    description: 'Persona encontrada',
    type: ResponsePersonaDto,
  })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async findOne(@Param('id') id: string): Promise<ResponsePersonaDto> {
    const persona = await this.personaService.findOne(+id);
    return plainToInstance(ResponsePersonaDto, persona);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Persona por ID' })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada',
    type: ResponsePersonaDto,
  })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ): Promise<ResponsePersonaDto> {
    const personaActualizada = await this.personaService.update(
      +id,
      updatePersonaDto,
    );
    return plainToInstance(ResponsePersonaDto, personaActualizada);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Persona por ID' })
  @ApiResponse({ status: 204, description: 'Persona eliminada' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async remove(@Param('id') id: string): Promise<ResponsePersonaDto> {
    const personaEliminada = await this.personaService.remove(+id);
    return plainToInstance(ResponsePersonaDto, personaEliminada);
  }
}
