import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { I18nService } from 'nestjs-i18n';

import { UserRepository, EntitiesService } from 'obai/entities';

@Injectable()
export class AuthService implements OnModuleInit {

    private supabase: SupabaseClient;

    constructor(
        @Inject(UserRepository)
        private readonly userRepo: UserRepository,
        @Inject(EntitiesService)
        private readonly entities: EntitiesService,
        private readonly i18n: I18nService
    ) {}

    onModuleInit() {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_ANON_KEY;
        if (!url || !key) {
            throw new Error(this.i18n.t('errors.supabase_config_missing'));
        }
        this.supabase = createClient(url, key, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            }
        });
    }

    async signUpWithEmailAndPassword(email: string, password: string, name: string) {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        });
        if (error) {
            throw error;
        }

        // Mirror user in local database for relations (Agents, Devices, etc)
        if (data.user) {
            await this.userRepo.create({
                id: data.user.id,
                email: email,
                name: name,
                password: 'SUPABASE_AUTH', // Managed by Supabase
            } as any);
        }

        return data;
    }

    async signInWithEmailAndPassword(
        email: string, 
        password: string, 
        deviceType: string = 'Unknown', 
        userAgent?: string,
        ipAddress?: string
    ) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw error;
        }

        // Register session in local database (Non-blocking)
        if (data.session && data.user) {
            try {
                await (this.entities as any).session.create({
                    data: {
                        userId: data.user.id,
                        token: data.session.refresh_token,
                        deviceType: deviceType,
                        userAgent: userAgent,
                        ipAddress: ipAddress,
                        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                    }
                });
            } catch (dbError: unknown) {
                const msg = this.formatErrorMessage(dbError);
                console.error('⚠️ Falló el registro de sesión en DB, pero el login fue exitoso:', msg);
            }
        }

        return data;
    }

    async signInWithOtp(email: string) {
        const { data, error } = await this.supabase.auth.signInWithOtp({
            email,
            options: {
                // Email is the default for magic links/OTP in Supabase
                shouldCreateUser: false, // Ensure we don't create users implicitly here if we want strict signup
            }
        });
        if (error) {
            throw error;
        }
        return data;
    }

    async verifyOtp(
        email: string, 
        token: string, 
        type: 'signup' | 'signin' | 'magiclink' = 'signup',
        deviceType: string = 'Unknown', 
        userAgent?: string,
        ipAddress?: string
    ) {
        if (!email) {
            throw new Error(this.i18n.t('errors.email_required_otp'));
        }

        const { data, error } = await this.supabase.auth.verifyOtp({
            email,
            token,
            type: type === ('signin' as any) ? 'magiclink' : (type as any),
        });

        if (error) {
            throw error;
        }

        // Mirror session in local database
        if (data.session && data.user) {
            try {
                await (this.entities as any).session.create({
                    data: {
                        userId: data.user.id,
                        token: data.session.refresh_token,
                        deviceType,
                        userAgent,
                        ipAddress,
                        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                    }
                });
            } catch (dbError: unknown) {
                const msg = this.formatErrorMessage(dbError);
                console.error('⚠️ Error registering session after OTP:', msg);
            }
        }

        return data;
    }

    async logout(refreshToken: string) {
        await this.supabase.auth.signOut();
        try {
            await (this.entities as any).session.deleteMany({
                where: { token: refreshToken }
            });
        } catch (error: unknown) {
            const msg = this.formatErrorMessage(error);
            console.error('⚠️ Error eliminando sesión en DB:', msg);
        }

        return { success: true };
    }

    private formatErrorMessage(error: unknown): string {
        if (error instanceof Error) return error.message;
        if (typeof error === 'string') return error;
        try {
            return JSON.stringify(error);
        } catch {
            return String(error);
        }
    }

}
