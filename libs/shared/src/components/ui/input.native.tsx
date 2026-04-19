import * as React from 'react';
import { View, Text } from 'react-native';

export function Input({ children }: { children?: React.ReactNode }) {
  return (
    <View>
      {/* TODO: Reemplazar con el equivalente de React Native Reusables o NativeWind */}
      <Text>{children || 'input nativo'}</Text>
    </View>
  );
}
