import * as React from 'react';
import { View, Text } from 'react-native';

export function Avatar({ children }: { children?: React.ReactNode }) {
  return (
    <View>
      {/* TODO: Reemplazar con el equivalente de React Native Reusables o NativeWind */}
      <Text>{children || 'avatar nativo'}</Text>
    </View>
  );
}
