import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).max(50),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const otpRequestSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
});

export type OtpRequestFormValues = z.infer<typeof otpRequestSchema>;

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, { message: 'El código debe tener 6 dígitos' }),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
