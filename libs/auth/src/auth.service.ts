import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { UserRepository } from '../../entities/src/classes/user/user.repository';
import { EntitiesService } from '../../entities/src/entities.service';

@Injectable()
export class AuthService implements OnModuleInit {

    private supabase: SupabaseClient;

    constructor(
        @Inject(UserRepository)
        private readonly userRepo: UserRepository,
        @Inject(EntitiesService)
        private readonly entities: EntitiesService
    ) {}

    onModuleInit() {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_ANON_KEY;
        if (!url || !key) {
            throw new Error('Supabase URL or Key is missing. Check your .env file.');
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
            } catch (dbError) {
                console.error('⚠️ Falló el registro de sesión en DB, pero el login fue exitoso:', dbError.message);
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
        } catch (error) {
            console.error('⚠️ Error eliminando sesión en DB:', error.message);
        }
        return { success: true };
    }

}
