import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class BitacoraMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const fecha = new Date().toLocaleString();
    const metodo = req.method;
    const ruta = req.originalUrl;
    console.log(`[${fecha}] ${metodo} ${ruta}`)
    next();
  }
}
