import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Direkter Fallback-Wert für den Fall, dass .env nicht geladen wird
const FALLBACK_URI = 'mongodb+srv://DEIN_USERNAME:DEIN_PASSWORT@DEINE_CLUSTER_URL/greenberlin?retryWrites=true&w=majority';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const uri = configService.get<string>('MONGODB_URI') || FALLBACK_URI;
                console.log('Using MongoDB connection URI:', uri); // Debug-Log
                return {
                    uri,
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}