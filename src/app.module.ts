import { Module } from '@nestjs/common';
import configuration from './configuration/environment.configuration';
import { configurationValidate } from './configuration/configuration.validate';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions as coreApiDataSourceOptions } from './configuration/orm.configuration';
import { DataSource } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: process.env.DB_NAME,
      useFactory: () => ({
        ...coreApiDataSourceOptions,
        autoLoadEntities: true,
        allowJs: true,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    UserModule,
    MessageModule,
    ChatModule,
  ],
})
export class AppModule {}
