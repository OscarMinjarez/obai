import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
// Importando desde el universal shared monorepo:
import { Button } from '@obai/shared/components/ui/button';
import { Card } from '@obai/shared/components/ui/card';
import { Input } from '@obai/shared/components/ui/input';
import { Label } from '@obai/shared/components/ui/label';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Welcome Back</Text>
        <Text style={{ color: '#6B7280', marginBottom: 24 }}>Enter your credentials for Obai</Text>
        
        <View style={{ width: '100%', marginBottom: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <Label><Text>Email</Text></Label>
            <Input />
          </View>
          <View>
            <Label><Text>Password</Text></Label>
            <Input />
          </View>
        </View>

        <View style={{ marginTop: 32, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Link href="/register" asChild>
             <Button><Text>Create account</Text></Button>
          </Link>
          <Link href="/" asChild>
             <Button><Text>Login</Text></Button>
          </Link>
        </View>
      </Card>
    </View>
  );
}
