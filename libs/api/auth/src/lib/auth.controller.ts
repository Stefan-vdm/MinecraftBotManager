import { Controller, UseGuards, Req, Get, Request, Res, Ip, Headers } from '@nestjs/common';
import { Response as express_response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from '../google-oauth-guard.guard';
import { ApiMinecraftService } from '@automated-minecraft-bot/api/minecraft';

@Controller('auth/')
export class AuthController {
    constructor(
        private passportService: AuthService,
        private apiMinecraftService: ApiMinecraftService
    ) { }

    @Get('google/')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req: any) {
        /**/
    }

    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req: Request, @Res() res: express_response, @Ip() ip: string, @Headers() headers: any) {
        console.log(headers);
        console.log("Will be using the following ip if possilbe:", headers['X-Forwarded-For']);
        this.passportService.generateJWT(req).then((token: any) => {
            res.cookie('jwt', token.jwt, { httpOnly: true });
            res.cookie('csrf', token.hash);
            res.redirect(process.env['FRONTEND_URL'] || "");
        });
        console.log("AUTH CONTROLLER IP = ",headers['X-Forwarded-For']);
        this.apiMinecraftService.users.add({
            ip: ip,
            uuid: ""
        })
    }
}
