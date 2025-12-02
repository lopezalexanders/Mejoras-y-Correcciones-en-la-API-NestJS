import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BitacoraMiddleware } from './bitacora/bitacora.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './persona/persona.module';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'demodb',
      autoLoadEntities: true,
    }),
    PersonaModule,
    EstudianteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BitacoraMiddleware).forRoutes('*');
  }
}
