import * as React from 'react';
import { View, Text } from 'react-native';

export function Button({ children }: { children?: React.ReactNode }) {
  return (
    <View>
      {/* TODO: Reemplazar con el equivalente de React Native Reusables o NativeWind */}
      <Text>{children || 'button nativo'}</Text>
    </View>
  );
}
