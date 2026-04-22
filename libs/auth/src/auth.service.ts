import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { UserRepository } from '../../entities/src/classes/user/user.repository';

@Injectable()
export class AuthService implements OnModuleInit {

    private supabase: SupabaseClient;

    constructor(
        @Inject(UserRepository)
        private readonly userRepo: UserRepository
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

    async signInWithEmailAndPassword(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw error;
        }
        return data;
    }

}
