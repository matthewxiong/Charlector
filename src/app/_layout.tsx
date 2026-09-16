import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CollectionProvider } from "../context/CollectionContext";

export default function TabLayout() {
  return (
    <CollectionProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#111111",
          tabBarInactiveTintColor: "#999999",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopColor: "#eeeeee",
            height: 80,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="collection"
          options={{
            title: "Collection",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="albums-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="market"
          options={{
            title: "Market",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="trending-up-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="packs"
          options={{
            title: "Packs",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="gift-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </CollectionProvider>
  );
}