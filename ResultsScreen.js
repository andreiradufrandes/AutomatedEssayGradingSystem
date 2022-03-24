import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
// import button
import ModalDropdown from 'react-native-modal-dropdown';


export default function ResultsScreen() {
  return (
    <View style={styles.container}>
        
        {/* 
        TODO:
        ADD A STATE HERE(OR PROPS) TO ADD THE NUMBER FROM MEMORY
        */}
        <Text>OVERALL SCORE: </Text>
        <Text>FEEDBACK</Text>

        {/* Feedback area */}
        <View style="feedbackArea">

        </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EA7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

// TODO 
// STYLE THE FEEDBACK AREA
  feedbackArea:{

  }
});
