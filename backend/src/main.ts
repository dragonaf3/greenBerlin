import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {join} from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as fs from "node:fs";

async function bootstrap() {

    const httpsOptions = {
        key: fs.readFileSync('./src/cert/key.pem'),
        cert: fs.readFileSync('./src/cert/cert.pem'),
    };

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        httpsOptions,
    });

    // Globale Validierung für alle Endpunkte
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));

    //CORS aktivieren
    app.enableCors();

    // Statische Dateien bereitstellen
    app.useStaticAssets(join(__dirname, '..', 'public'));

    // Swagger-Dokumentation einrichten
    const config = new DocumentBuilder()
        .setTitle('GreenBerlin API')
        .setDescription('API für die GreenBerlin-Anwendung')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Starte Server
    const port = 8000;
    const host = '45.133.9.54';

    await app.listen(port, host);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();