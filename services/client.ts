import { authService } from '@/providers/auth.provider';

export const client = authService.createHttpClient();
