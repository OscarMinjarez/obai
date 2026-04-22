const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Por favor, proporciona el nombre de un componente. Ejemplo: npm run ui:add button');
  process.exit(1);
}

console.log(`\n🚀 Generando componente [${componentName}] para Web y Móvil...\n`);

try {
  // 1. Ejecutar Shadcn en Web (Como redigirimos components.json, lo escribirá en libs/shared)
  console.log(`🌐 [Next.js] Descargando de Shadcn UI...`);
  execSync(`npx shadcn@latest add ${componentName} --overwrite --yes`, {
    cwd: path.resolve(__dirname, '../apps/web'),
    stdio: 'inherit'
  });

  // 2. Crear un archivo .native.tsx automático si no existe.
  // Nota: Cuando incorpores 'rnr' (React Native Reusables), puedes reemplazar este archivo
  //       con el comando: npx rnr add ${componentName}
  const sharedUiPath = path.resolve(__dirname, `../libs/shared/src/components/ui`);
  const componentFile = path.join(sharedUiPath, `${componentName}.tsx`);
  const nativeFile = path.join(sharedUiPath, `${componentName}.native.tsx`);

  if (fs.existsSync(componentFile) && !fs.existsSync(nativeFile)) {
    console.log(`📱 [React Native] Creando esqueleto nativo para ${componentName}.native.tsx...`);
    
    const nativeStub = `import * as React from 'react';
import { View, Text } from 'react-native';

export function ${componentName.charAt(0).toUpperCase() + componentName.slice(1)}({ children }: { children?: React.ReactNode }) {
  return (
    <View>
      {/* TODO: Reemplazar con el equivalente de React Native Reusables o NativeWind */}
      <Text>{children || '${componentName} nativo'}</Text>
    </View>
  );
}
`;
    fs.writeFileSync(nativeFile, nativeStub, 'utf8');
  }

  console.log(`\n✅ ¡Completado! El componente está disponible globalmente en @obai/shared/components/ui/${componentName}\n`);

} catch (error) {
  console.error(`\n❌ Error al generar el componente:`, error.message);
}
