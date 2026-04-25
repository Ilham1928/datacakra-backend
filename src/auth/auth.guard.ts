import { AuthGuard } from '@nestjs/passport';

export class Guard extends AuthGuard('jwt') {}
