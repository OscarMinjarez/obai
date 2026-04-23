import { Global, Module } from '@nestjs/common';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '../../../libs/shared/src/locales/'), // Relative to dist/apps/client-api/
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
  exports: [I18nModule],
})
export class ObaiI18nModule {}
