import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el JWT del header
      ignoreExpiration: false, // No ignorar la expiración
      secretOrKey: process.env.JWT_SECRET, // Clave secreta del token
    });
  }

  async validate(payload: any) {
    // Este método se ejecuta cuando el token ha sido validado correctamente
    return { userId: payload.sub, username: payload.username };
  }
}
