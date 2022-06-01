import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home";
import FeedbackScreen from "./Feedback";

// Create a stack navigator to contain our screens
const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      // create a stack navigator to contain screens
      <NavigationContainer>
        {/* Hide the header of the page */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
