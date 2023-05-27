import { authService } from '@/providers/auth.provider';

const { NEXT_PUBLIC_API_URL } = process.env;

export const client = authService.createHttpClient({ baseURL: `${NEXT_PUBLIC_API_URL}/api` });
