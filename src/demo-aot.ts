// import "reflect-metadata";

// The usual bootstrapping imports
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './demo/app.module.ngfactory';
// import { AppModule } from './demo/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
// platformBrowser().bootstrapModule(AppModule);
