import { Controller, UseGuards, Req, Get, Request, Res } from '@nestjs/common';
import { Response as express_response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from '../google-oauth-guard.guard';

@Controller('auth/')
export class AuthController {
    constructor(
        private passportService: AuthService,
    ) { }

    @Get('google/')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req: any) {
        /**/
    }

    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req: Request, @Res() res: express_response) {
        this.passportService.generateJWT(req).then((token: any) => {
            res.cookie('jwt', token.jwt, { httpOnly: true });
            res.cookie('csrf', token.hash);
            res.redirect(process.env['FRONTEND_URL'] || "");
        });
    }
}
