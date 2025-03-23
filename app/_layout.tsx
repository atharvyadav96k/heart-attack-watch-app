import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#00ff00',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { backgroundColor: '#111', borderTopColor: '#444' },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: "Monitor",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="parameter" 
        options={{
          title: "Form",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="clipboard" size={size} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="info" 
        options={{
          title: "Emergency",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="warning" size={size} color={color} />,
        }} 
      />
    </Tabs>
  );
}
