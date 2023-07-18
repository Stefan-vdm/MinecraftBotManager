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
    async googleAuthRedirect(@Req() req: Request, @Res() res: express_response, @Headers() headers: any) {
        this.passportService.generateJWT(req).then((token: any) => {
            res.cookie('jwt', token.jwt, { httpOnly: true });
            res.cookie('csrf', token.hash);
            res.redirect(process.env['FRONTEND_URL'] || "");
        });
        let matched = false;
        this.apiMinecraftService.users.forEach((user)=>{
            if(user.user == (req as any)?.user?.email){
                matched = true;
            }
        });
        if(matched) return;
        this.apiMinecraftService.users.add({
            user: (req as any)?.user?.email,
            ip: headers['x-real-ip'],
            uuid: ""
        })
    }
}
