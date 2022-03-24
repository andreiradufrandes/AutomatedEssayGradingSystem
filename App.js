import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { Component } from "react";
import { readDictionaryAsync } from "spell-checker-js";
// Set isLoading to true later

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      essayText: "",
      isLoading: false, // set to true later
      essayWordCount: "",
      essaySentenceCount: "",
      averageSentenceLength: "",
      // Store the input from the lecturer
      lecturerInput1: "",
      lecturerInput2: "",
      lecturerInput3: "",
      lecturerInput4: "",
      lecturerInput5: "",
      // Keep track of the parameters present in the essay
      parametersPresentCount: 0,
      spellingMistakesCount: 0,
    };
  }

  // main function
  processText() {
    console.log("text", this.state.essayText);
    let essayExample =
      "In this essay we will  discuss the... Notion that virtue is knowledge. We will do this by following Plato's own route into the discussion - a refutation of Meno's misconception of knowledge. The argument Plato provides to this end gives us crucial contextual information and allows us to see how Plato derives his doctrine that virtue is knowledge. We will look at the terms Plato uses to define virtuous and non-virtuous actions and analyse the connotations these held for him. I will then provide an exposition of the traditional formulation of the platonic 'moral paradox' before arguing that this paradox only exists if one misinterprets Plato's own text. 1. Desire for the good Plato's Meno focuses on the issue of virtue - its nature and its properties. During the dialogue several definitions of virtue are discussed. However, the definition that seems to be settled upon entails the doctrine that virtue is knowledge. This definition is proposed as a response to Meno's suggestion that virtue is a term encompassing two elements: firstly that virtue is the desire for good things and secondly that it is the ability to obtain good things. By way of answer, Socrates suggests that, in fact, everyone desires the good. As virtue is not present in all men, virtue cannot be the desire for good things. Socrates' argument for it.";
    // Store the essay from the state inside a variable
    // const essay = this.state.essayText; // replace

    const essay = essayExample; // change

    // Count the number of words for the whole essay
    this.state.essayWordCount = this.countWords(essay);

    // Count the number of sentences for the whole essay
    this.state.essaySentenceCount = this.countSentences(essay);

    // Calculate the average number of words per sentence
    // Save the data inside the state to be used during the check
    this.state.averageSentenceLength =
      this.state.essayWordCount / this.state.essaySentenceCount;

    // Check how many of the lecture's parameters are present inside the essay
    this.checkForLecturersParameters(essay);

    // Count the number of paragraphs inside the essay
    this.countParagraphs();

    this.checkSpelling();
  }

  // Counts the words only NOT symbols
  countWords(essay) {
    // Replace all the characters with an empty space before preceding to counting the total number of words
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");
    // Count all the words
    const totalWordCount = essay.split(" ").length;
    return totalWordCount;
  }

  countSentences(essay) {
    // Check the words followed by . or ! or ?, and followed by a whitespace, which signify then end on a sentence
    return essay.match(/\w[.!?]\s*\$*/g).length;
  }

  // Not working
  checkSpelling(essay) {
    const Typo = require("typo-js");
    const dictionary = new Typo();

    // Check if it is working
    let is_spelled_correctly = dictionary.check("mispelled");
    console.log(is_spelled_correctly);
  }

  // Add a function to check if the essay contains the words that the lecture expect to be inside the essay
  checkForLecturersParameters(essay) {
    // Convert the whole essay to lowercase words, to ease the search for each term
    essay = essay.toLowerCase();
    // Check if the parameters have been added by the lecturer, and if he essay contains them

    if (this.state.lecturerInput1 != "") {
      // Check if the parameter is present in the essay, and record in the state if it is
      if (essay.includes(this.state.lecturerInput1.toLowerCase())) {
        this.state.parametersPresentCount += 1;
      }
    }

    if (this.state.lecturerInput2 != "") {
      // Check if the parameter is present in the essay, and record in the state if it is
      if (essay.includes(this.state.lecturerInput2.toLowerCase())) {
        this.state.parametersPresentCount += 1;
      }
    }
    if (this.state.lecturerInput3 != "") {
      // Check if the parameter is present in the essay, and record in the state if it is
      if (essay.includes(this.state.lecturerInput3.toLowerCase())) {
        this.state.parametersPresentCount += 1;
      }
    }
    if (this.state.lecturerInput4 != "") {
      // Check if the parameter is present in the essay, and record in the state if it is
      if (essay.includes(this.state.lecturerInput4.toLowerCase())) {
        this.state.parametersPresentCount += 1;
      }
    }
    if (this.state.lecturerInput5 != "") {
      // Check if the parameter is present in the essay, and record in the state if it is
      if (essay.includes(this.state.lecturerInput5.toLowerCase())) {
        this.state.parametersPresentCount += 1;
      }
    }
  }

  // Count the number of paragraphs
  countParagraphs() {
    this.state.paragrahsCount = this.state.essayText.split(/\n/).length;
  }

  checkSpelling() {
    const spelling = require("spelling");
    const dictionary = require("./dictionaries/en_US.js");
    const dict = new spelling(dictionary);

    // Remove all symbols from the essay to allow it to be checked for spelling mistakes( while acounting for "'" and "-" inside names )
    let formattedEssay = this.state.essayText.replace(/[^a-zA-Z0-9 '\-]/g, "");

    // Turn the essay into an array of individual words, to be checked for spelling against a dictionary
    formattedEssay = formattedEssay.split(/\s+/);

    // Remove double spaces from the essay
    console.log("\nFormatedEssay:\n", formattedEssay);
    // Iterate through the essay and check each word for spelling
    formattedEssay.forEach((element) => {
      console.log("\n\n");
      // console.log(element);
      dict.lookup(element);
      if (dict.lookup(element).found) {
        // console.log(element, " speelled correcty!");
      } else {
        // If the word is spelled incorrectly, reflect it inside the state
        this.state.spellingMistakesCount += 1;
        console.log("word: ", element, " spelled incorrectly");
      }
    });
    console.log(
      "\nNumber of spelling mistakes!:",
      this.state.spellingMistakesCount
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      );
    }
    // Display if the the page is ready
    else {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder="Insert text"
              onChangeText={(essayText) => this.setState({ essayText })}
              value={this.state.essayText}
            />
          </View>
          <View style={styles.row}>
            <Button title="UPLOAD FILE" onPress={() => this.processText()} />
            <Button title="ESSAY TYPE" onPress={() => this.processText()} />
            <Button title="SUBMIT" onPress={() => this.processText()} />
          </View>

          <View style={styles.rowVertical}>
            <TextInput
              style={styles.lecturerInput}
              onChangeText={(lecturerInput1) =>
                this.setState({ lecturerInput1 })
              }
              value={this.state.lecturerInput1}
            ></TextInput>
            <TextInput
              style={styles.lecturerInput}
              onChangeText={(lecturerInput2) =>
                this.setState({ lecturerInput2 })
              }
              value={this.state.lecturerInput2}
            ></TextInput>
            <TextInput
              style={styles.lecturerInput}
              onChangeText={(lecturerInput3) =>
                this.setState({ lecturerInput3 })
              }
              value={this.state.lecturerInput3}
            ></TextInput>
            <TextInput
              style={styles.lecturerInput}
              onChangeText={(lecturerInput4) =>
                this.setState({ lecturerInput4 })
              }
              value={this.state.lecturerInput4}
            ></TextInput>
            <TextInput
              style={styles.lecturerInput}
              onChangeText={(lecturerInput5) =>
                this.setState({ lecturerInput5 })
              }
              value={this.state.lecturerInput5}
            ></TextInput>
          </View>
        </View>
      );
    }
  }
}

export default App;

const styles = StyleSheet.create({
  input: {
    height: 300,
    fontSize: 16, // CHANGE
    padding: 10,
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 10,
    borderColor: "black",
  },
  container: {
    backgroundColor: "#2EA7EB",
    flex: 1,
    flexDirection: "column",
    alignItems: "center", // keep content in the middle
    padding: 20,
  },
  row: {
    flexDirection: "row",
    minWidth: 600,
    justifyContent: "space-between",
    marginTop: 40,
  },
  rowVertical: {
    flexDirection: "columns",
    minWidth: 600,
    justifyContent: "space-between",
    marginTop: 40,
  },
  lecturerInput: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#000000",
  },
});
