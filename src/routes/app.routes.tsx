import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export type RootBottomTabParamList = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<RootBottomTabParamList>();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      // tabBarOptions={{
      //   activeTintColor: theme.colors.secondary,
      //   inactiveTintColor: theme.colors.text,
      //   labelPosition: "beside-icon",
      //   style: {
      //     paddingVertical: Platform.OS === "ios" ? 20 : 0,
      //     height: 88,
      //   },
      // }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: MaterialIconName = "format-list-bulleted";

          if (route.name === "Listagem") {
            iconName = "format-list-bulleted";
          } else if (route.name === "Cadastrar") {
            iconName = "attach-money";
          } else if (route.name === "Resumo") {
            iconName = "pie-chart";
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarLabelPosition: "beside-icon",
      })}
    >
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
      <Screen name="Resumo" component={Resume} />
    </Navigator>
  );
}
