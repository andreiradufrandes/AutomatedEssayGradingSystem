import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import the screens that form the navigation
import HomeScreen from "./Home";
import FeedbackScreen from "./Feedback";

// Create a stack navigator to contain our screens
const Stack = createNativeStackNavigator();

class Main extends Component {
  render() {
    return (
      // create s stack navigator to contain the first 3 components of the app
      <NavigationContainer>
        {/* Hide the header of the page */}
        {/* <Stack.Navigator screenOptions={{ headerShown: false }}> */}
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;
