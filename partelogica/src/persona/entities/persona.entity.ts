import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '' })
  paterno: string;

  @Column({ type: 'varchar', default: '' })
  materno: string;

  @Column({ type: 'varchar', default: '' })
  nombres: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechanacimiento: Date;

  @Column({ type: 'varchar', default: '' })
  direccion: string;

  @Column({ type: 'int', default: 0 })
  telefono: number;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.persona)
  estudiantes: Estudiante[];
}
