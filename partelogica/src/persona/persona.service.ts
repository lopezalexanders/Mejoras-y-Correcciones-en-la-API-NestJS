import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto) {
    const nuevo = this.personaRepository.create({
      paterno: createPersonaDto.paterno,
      materno: createPersonaDto.materno ?? '',
      nombres: createPersonaDto.nombres,
      fechanacimiento: createPersonaDto.fechanacimiento,
      direccion: createPersonaDto.direccion ?? '',
      telefono: createPersonaDto.telefono ?? 0,
    });
    return await this.personaRepository.save(nuevo);
  }

  async findAll(): Promise<Persona[]> {
    return await this.personaRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOne({
      where: { id },
    });
    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no se encuentra`);
    }
    return persona;
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const mpersona = await this.personaRepository.preload({
      id,
      ...updatePersonaDto,
    });
    if (!mpersona) {
      throw new NotFoundException(
        `No se puede actualizar. Persona con ID ${id} no se encuentra`,
      );
    }
    return await this.personaRepository.save(mpersona);
  }

  async remove(id: number): Promise<void> {
    const rpersona = await this.findOne(id);
    await this.personaRepository.remove(rpersona);
  }
}
