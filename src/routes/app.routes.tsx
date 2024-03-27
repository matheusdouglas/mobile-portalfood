import { createDrawerNavigator } from "@react-navigation/drawer";

import Student from "../pages/student";
import BotaoSair from "../components/botaoSair";
import MyTable from "../pages/Dashboard";

const Drawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <Drawer.Navigator 
      screenOptions={{
        drawerStyle: {
          width: 240,
        },
        drawerActiveTintColor: '#FFA42D'
      }}
    >
      
       <Drawer.Screen 
        name="Dashboard"
        component={MyTable} 
        options={{
          headerRight: () => (
            <BotaoSair />
          ),
        }} 
      />
      
      <Drawer.Screen 
        name="Cadastro"
        component={Student} 
        options={{
          headerRight: () => (
            <BotaoSair />
          ),
        }} 
      />

     
    </Drawer.Navigator>
  );
}

export default AppRoutes;
