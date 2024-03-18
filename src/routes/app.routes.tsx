import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "../pages/dashboard";

const Drawer = createDrawerNavigator();

function  AppRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
}

export default AppRoutes;
