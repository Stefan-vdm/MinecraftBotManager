import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateJWT(toSign: any) {
    const user = toSign.user;
    if (user === undefined) return '';
    const randomBytesP = promisify(randomBytes);
    const willSign = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
      hash: (await randomBytesP(16)).toString('hex'),
    };
    return {
      jwt: await this.jwtService.signAsync(willSign, {
        privateKey: process.env['JWT_SECRET'],
        expiresIn: process.env['JWT_EXPIRE_TIME'],
      }),
      hash: willSign.hash,
    };
  }
}
