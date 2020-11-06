import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OnboardingPage from "../pages/OnboardingPage";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import AnunciatePage from "../pages/AnunciatePage";
import PagosPage from "../pages/PagosPage";
import ShopPage from "../pages/ShopPage";
import CardsUsuarios from "../components/Cards";
import MessagesScreen from "../pages/ChatMessages";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Badge } from "react-native-elements";
import { navigationRef } from "../RootNavigation";
import AnunciosPage from "../components/Anuncios.js";
import Chat from "../components/ChatComponent";
import AnuncioSeleccionado from "../components/Anuncio";
import MisComentariosPage from "../components/MisComentarios";
import CambiarNombreScreen from "../components/CambiarNombreComponent";
import UbicacionPage from "../components/FiltroUbicacion";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function MainTabNavigator({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="OnboardingPage"
        component={OnboardingPage}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          tabBarLabel: "Mensajes",
          tabBarIcon: ({ color, size }) => (
            <View>
              {Chat.messages >= 1 && (
                <Badge
                  status="primary"
                  badgeStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    position: "absolute",
                    backgroundColor: "orange",
                  }}
                  containerStyle={{ position: "absolute", top: -4, left: -4 }}
                />
              )}
              <MaterialCommunityIcons name="message" color={color} size={35} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ShopPage"
        component={ShopPage}
        options={{
          tabBarLabel: "Shop",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarLabel: "Mi Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStackNavigator({ navigation }) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#633689" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingPage"
          component={OnboardingPage}
          options={{ title: "QueDeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="CardsUsuarios"
          component={CardsUsuarios}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="ChatComponent"
          component={Chat}
          options={{ title: "QuedeOficios!", headerShown: false }}
          initialParams={{ firstUserId: null, secondUserId: null }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="AnunciatePage"
          component={AnunciatePage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="PagosPage"
          component={PagosPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="ShopPage"
          component={ShopPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="Anuncios"
          component={AnunciosPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="AnuncioSeleccionado"
          component={AnuncioSeleccionado}
          options={{ title: "QuedeOficios!", headerShown: false }}
          initialParams={{ id: null }}
        />
        <Stack.Screen
          name="MisComentariosPage"
          component={MisComentariosPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="CambiarNombreScreen"
          component={CambiarNombreScreen}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
        <Stack.Screen
          name="UbicacionPage"
          component={UbicacionPage}
          options={{ title: "QuedeOficios!", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
