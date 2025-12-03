import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const { personaId, planestudio } = createEstudianteDto;
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
    });
    if (!persona) {
      throw new NotFoundException(`Persona con id ${personaId} no encontrada`);
    }
    const estudiante = this.estudianteRepository.create({
      planestudio,
      persona,
    });
    return await this.estudianteRepository.save(estudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteRepository.find();
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrada`);
    }
    return estudiante;
  }

  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<UpdateEstudianteDto> {
    const estudiante = await this.findOne(id);
    if (updateEstudianteDto.personaId) {
      const persona = await this.personaRepository.findOne({
        where: { id: updateEstudianteDto.personaId },
      });
      if (!persona) {
        throw new NotFoundException(
          `Persona con id ${updateEstudianteDto.personaId} no encontrada`,
        );
      }
      estudiante.persona = persona;
    }
    if (updateEstudianteDto.planestudio !== undefined) {
      estudiante.planestudio = updateEstudianteDto.planestudio;
    }
    return await this.estudianteRepository.save(estudiante);
  }

  async remove(id: number): Promise<void> {
    const estudiante = await this.findOne(id);
    await this.estudianteRepository.remove(estudiante);
  }
}
