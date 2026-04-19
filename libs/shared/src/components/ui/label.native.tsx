import * as React from 'react';
import { View, Text } from 'react-native';

export function Label({ children }: { children?: React.ReactNode }) {
  return (
    <View>
      {/* TODO: Reemplazar con el equivalente de React Native Reusables o NativeWind */}
      <Text>{children || 'label nativo'}</Text>
    </View>
  );
}
