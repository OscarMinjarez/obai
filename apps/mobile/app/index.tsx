import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
// Importando desde el universal shared monorepo:
import { Button } from '@obai/shared/components/ui/button';
import { Card } from '@obai/shared/components/ui/card';
import { Input } from '@obai/shared/components/ui/input';
import { Avatar } from '@obai/shared/components/ui/avatar';

export default function ChatScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB', padding: 16, paddingTop: 48 }}>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 16, marginBottom: 16 }}>
          <Avatar />
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Obai</Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Intelligent Companion</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1, marginBottom: 16, minHeight: 250 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 }}>
            <View style={{ backgroundColor: '#3B82F6', padding: 12, borderRadius: 8, borderTopRightRadius: 0, maxWidth: '80%' }}>
              <Text style={{ color: 'white' }}>Is the mobile socket ready?</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 16 }}>
            <View style={{ backgroundColor: '#E5E7EB', padding: 12, borderRadius: 8, borderTopLeftRadius: 0, maxWidth: '80%' }}>
              <Text style={{ color: 'black' }}>Almost! Native components are sharing identical imports with the Web.</Text>
            </View>
          </View>
        </ScrollView>

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Input />
          </View>
          <Button><Text>Send</Text></Button>
        </View>
        
        <View style={{ marginTop: 16, alignItems: 'center' }}>
            <Link href="/login" asChild>
                <Button><Text>Go to Auth</Text></Button>
            </Link>
        </View>
      </Card>
    </View>
  );
}
