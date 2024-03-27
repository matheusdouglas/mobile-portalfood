import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../pages/Login";



const Drawer = createDrawerNavigator();
function  AuthRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={Login} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
}

export default AuthRoutes;

