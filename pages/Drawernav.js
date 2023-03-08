import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeM from "./HomeM";
import HomeT from "./HomeT";

const Drawer = createDrawerNavigator();

const Drawernav = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen
                name="Movies"
                component={HomeM}
            />
            <Drawer.Screen
                name="TV Shows"
                component={HomeT}
            />
        </Drawer.Navigator>
    );
};

export default Drawernav;