import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { DatabaseModule } from './shared/database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Konfigurationsmodul laden
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Datenbankverbindung
    DatabaseModule,

    // Anwendungsmodule
    UsersModule,
    LocationsModule,

    // Statische Dateien bereitstellen
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}