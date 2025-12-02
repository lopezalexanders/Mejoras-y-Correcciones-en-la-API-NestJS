import { Persona } from 'src/persona/entities/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  planestudio: string;

  @ManyToOne(() => Persona, (persona) => persona.estudiantes, { eager: true })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;
}
