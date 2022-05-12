import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
// import { readFile } from "fs";
// import { readDictionaryAsync } from "spell-checker-js";

// Set isLoading to true later

// Todo
// 1. Reset parameters at every turn

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      essayText: "",
      isLoading: false, // set to true later
      essayWordCount: "",
      essaySentenceCount: "",
      averageSentenceLength: "",
      averageWordLength: "",
      paragraphsCount: "",
      // Store the input from the lecturer
      lecturerInput1: "",
      lecturerInput2: "",
      lecturerInput3: "",
      lecturerInput4: "",
      lecturerInput5: "",
      lecturerInputPhrase1: "",
      lecturerInputPhrase2: "",
      lecturerInputPhrase3: "",
      lecturerInputPhrase4: "",
      lecturerInputPhrase5: "",
      // Keep track of the parameters present in the essay
      parametersPresentCount: 0,
      spellingMistakesCount: 0,
      // Keep track of the range of words the lecturer expects the essay to be
      minNumberWords: "",
      maxNumberWords: "",
      // Slider value
      // Keep track of the number of prepositions
      prepositionsCount: 0,
      referencesCount: 0,
    };
  }

  // main function
  processText() {
    // console.log("Essay:\n", this.state.essayText);
    let essayExample =
      "In this essay we will  discuss the... Notion that virtue is knowledge. We will do this by following Plato's own route into the discussion - a refutation of Meno's misconception of knowledge. The argument Plato provides to this end gives us crucial contextual information and allows us to see how Plato derives his doctrine that virtue is knowledge. We will look at the terms Plato uses to define virtuous and non-virtuous actions and analyse the connotations these held for him. I will then provide an exposition of the traditional formulation of the platonic 'moral paradox' before arguing that this paradox only exists if one misinterprets Plato's own text. 1. Desire for the good Plato's Meno focuses on the issue of virtue - its nature and its properties. During the dialogue several definitions of virtue are discussed. However, the definition that seems to be settled upon entails the doctrine that virtue is knowledge. This definition is proposed as a response to Meno's suggestion that virtue is a term encompassing two elements: firstly that virtue is the desire for good things and secondly that it is the ability to obtain good things. By way of answer, Socrates suggests that, in fact, everyone desires the good. As virtue is not present in all men, virtue cannot be the desire for good things. Socrates' argument for it.";
    // Store the essay from the state inside a variable
    // const essay = this.state.essayText; // replace

    const essay = essayExample; // change

    // Count the number of words for the whole essay
    this.countWords();

    // calculate the average word length
    this.averageWordLength();

    // Count the number of sentences for the whole essay
    this.state.essaySentenceCount = this.countSentences();

    // Calculate the average number of words per sentence
    // Save the data inside the state to be used during the check
    this.state.averageSentenceLength =
      this.state.essayWordCount / this.state.essaySentenceCount;

    // Check how many of the lecture's parameters are present inside the essay
    this.checkForLecturersParameters();

    // Count the number of paragraphs inside the essay
    this.countParagraphs();

    // Check if the of words inside the essay is in the range speciied by the lecturer
    // this.checkWordsRange();
    // Count the number of prepositions present in the essay
    this.countPrepositions();
    // Check how frequently each word appear in the essay
    this.checkWordFrequency();
    this.checkSpelling();
    this.checkPunctuation();
    this.checkSpelling();

    // this.props.navigation.navigate("Feedback", {
    //   number: 2,
    // });
    const results = {
      wordCount: this.state.essayWordCount,
      sentenceCount: this.state.sentenceCount,
      paragraphsCount: this.state.paragraphsCount,
      prepositionsCount: this.state.prepositionsCount,
      referencesCount: this.state.referencesCount,
      averageSentenceLength: this.state.averageSentenceLength,
      averageWordLength: this.state.averageWordLength,
      percentageUniqueWords: this.state.percentageUniqueWords,
      keyTermsPresent: this.state.keyTermsPresent,
      keyPhrasesPresent: this.state.keyPhrasesPresent,
      spellingMistakesCount: this.state.spellingMistakesCount,
      essaySentenceCount: this.state.essaySentenceCount,
    };
    // Send the object cntaining the essay features to the results page
    this.props.navigation.navigate("Feedback", {
      results: results,
    });
  }

  // Not working
  checkSpelling() {
    // const fs = require("fs");
    // fs.readFile("file.txt", "utf-8", (err, data) => {
    //   // Check if there is an error
    //   if (err) {
    //     console.error(err);
    //     return null;
    //   }
    //   // Log the file contents
    //   console.log("DATA ", data);
    // });
  }

  // Counts the words only NOT symbols
  countWords() {
    let essay = this.state.essayText;
    // Replace all the characters with an empty space before preceding to counting the total number of words
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");
    // Count the number of words
    this.state.essayWordCount = essay.split(" ").length;
  }

  // Count how often each word is present
  checkWordFrequency() {
    let essay = this.state.essayText;
    essay =
      "In this essay we will  discuss the... Notion that virtue is knowledge. We will do this by following Plato's own route into the discussion - a refutation of Meno's misconception of knowledge. The argument Plato provides to this end gives us crucial contextual information and allows us to see how Plato derives his doctrine that virtue is knowledge. We will look at the terms Plato uses to define virtuous and non-virtuous actions and analyse the connotations these held for him. I will then provide an exposition of the traditional formulation of the platonic 'moral paradox' before arguing that this paradox only exists if one misinterprets Plato's own text. 1. Desire for the good Plato's Meno focuses on the issue of virtue - its nature and its properties. During the dialogue several definitions of virtue are discussed. However, the definition that seems to be settled upon entails the doctrine that virtue is knowledge. This definition is proposed as a response to Meno's suggestion that virtue is a term encompassing two elements: firstly that virtue is the desire for good things and secondly that it is the ability to obtain good things. By way of answer, Socrates suggests that, in fact, everyone desires the good. As virtue is not present in all men, virtue cannot be the desire for good things. Socrates' argument for it.";
    // Replace all the characters with an empty space before preceding to counting the total number of words
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");
    // Count the number of words
    essay = essay.split(" ");

    let wordFrequencyCounter = {};

    // Loop through all the word in the essay, and keep count of how many times they appear
    essay.forEach((word) => {
      // If the word is not present, add it to the dictionary
      if (!wordFrequencyCounter[word]) {
        wordFrequencyCounter[word] = 1;
      } else {
        // If the word is already present in the dictionary, increase its count number
        wordFrequencyCounter[word] += 1;
      }
    });

    // console.group(wordFrequencyCounter);
  }

  // Check the average length of the words
  averageWordLength() {
    let essay = this.state.essayText;

    // Replace all the characters with an empty space before preceding to counting the total number of words
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");
    // store all the words inside an array to be able to count the word length after
    essay = essay.split(" ");

    let totalWordLength = 0;
    // Calculate the length of each word and add it together to be able to calculater the average
    essay.forEach((word) => {
      totalWordLength += word.length;
    });

    // Divide the sum of all length of each word by the total number of words
    this.state.averageWordLength = Math.round(
      totalWordLength / this.state.essayWordCount
    );
  }

  countSentences() {
    // Check the words followed by . or ! or ?, and followed by a whitespace, which signify then end on a sentence
    let essay = this.state.essayText;
    console.log("---ESSAY-----: ", essay);
    return essay.match(/\w[.!?]\s*\$*/g).length;
  }

  checkPunctuation() {
    let essay = this.state.essayText;
    // Check the words followed by . or ! or ?, and followed by a whitespace, which signify then end on a sentence

    essay =
      "In this essay we will  discuss the...otion that virtue is knowledge. (We will do this by following Plato's own route into the discussion - a refutation of Meno's misconception of knowledge. \"The argument Plato provides to this end gives us crucial contextual information and allows us to see how Plato derives his doctrine that virtue is knowledge. (altought)We will look at the terms Plato uses to define virtuous and non-virtuous actions and analyse the connotations these held for him. I will then provide an exposition of the traditional formulation of the platonic 'moral paradox' before arguing that this paradox only exists if one misinterprets Plato's own text. 1. Desire for the good Plato's Meno focuses on the issue of virtue - its nature and its properties. During the dialogue several definitions of virtue are discussed. However, the definition that seems to be settled upon entails the doctrine that virtue is knowledge. This definition is proposed as a response to Meno's suggestion that virtue is a term encompassing two elements: firstly that virtue is the desire for good things and secondly that it is the ability to obtain good things. By way of answer, Socrates suggests that, in fact, everyone desires the good. As virtue is not present in all men, virtue cannot be the desire for good things. Socrates' argument for it.";
    // console.log(essay.match(/[^.!?]+[.!?]/g));

    let errorCounter = 0;
    // Breack the essay into sentences and check that it starts with the capitalised word
    essay = essay.match(/[^.!?]+[.!?]/g);

    // Check that the first occurance is a number OR " OR capitalised word
    let sentenceStartPattern = /^ *[A-Z1-9"\(]/g;

    // Check if all the sentences start with a capitalised letter or a number or a symbol found at the beginning of the sentence
    essay.forEach((sentence) => {
      if (!sentence.match(sentenceStartPattern)) {
        // console.log("Error, sentence written incorscely:  ", sentence);
        errorCounter += 1;
      }
    });
  }

  // checkForLecturersParameters() {
  //   // Reset the parameter count inside the state to count correctly at each iteration
  //   this.state.parametersPresentCount = 0;

  //   // Store all the topic key terms provided by the lecturer in an array to ease the search for individual topic terms
  //   let lecturerParameteres = [
  //     this.state.lecturerInput1,
  //     this.state.lecturerInput2,
  //     this.state.lecturerInput3,
  //     this.state.lecturerInput4,
  //     this.state.lecturerInput5,
  //     this.state.lecturerInputPhrase1,
  //     this.state.lecturerInputPhrase2,
  //     this.state.lecturerInputPhrase3,
  //     this.state.lecturerInputPhrase4,
  //     this.state.lecturerInputPhrase5,
  //   ];

  //   // Check how many of the parameters are present inside the essay
  //   lecturerParameteres.forEach((element) => this.checkForParameter(element));

  //   // console.log(
  //   //   "Parameters: ",
  //   //   this.state.lecturerInput1,
  //   //   this.state.lecturerInput2,
  //   //   this.state.lecturerInput3,
  //   //   this.state.lecturerInput4,
  //   //   this.state.lecturerInput5,
  //   //   " Parameters present: ",
  //   //   this.state.parametersPresentCount
  //   // ); // DELETE
  //   console.log(this.state.parametersPresentCount);
  // }

  // Helper function to cehck for individual search terms

  checkForLecturersParameters() {
    // Reset the parameter count inside the state to count correctly at each iteration
    this.state.parametersPresentCount = 0;

    // Store all the topic key terms provided by the lecturer in an array to ease the search for individual topic terms
    let lecturerParameteres = [
      this.state.lecturerInput1,
      this.state.lecturerInput2,
      this.state.lecturerInput3,
      this.state.lecturerInput4,
      this.state.lecturerInput5,
    ];
    let lecturerParameteresPhrases = [
      this.state.lecturerInputPhrase1,
      this.state.lecturerInputPhrase2,
      this.state.lecturerInputPhrase3,
      this.state.lecturerInputPhrase4,
      this.state.lecturerInputPhrase5,
    ];
    let keyTermsPresent = 0;
    let keyPhrasesPresent = 0;
    // Check how many of the key terms parameters are present inside the essay
    for (let i = 0; i < lecturerParameteres.length; i++) {
      keyTermsPresent += this.checkForParameter(lecturerParameteres[i]);
    }

    // Check how many of the key phrases parameters are present inside the essay
    for (let i = 0; i < lecturerParameteresPhrases.length; i++) {
      keyPhrasesPresent += this.checkForParameter(
        lecturerParameteresPhrases[i]
      );
    }

    this.state.keyTermsPresent = keyTermsPresent;
    this.state.keyPhrasesPresent = keyPhrasesPresent;
  }

  checkForParameter(keyTerm) {
    // keep track of the number of parameters present
    let parametersCount = 0;
    // Convert the whole essay to lowercase words, to ease the search for each term
    let essayLowerCaps = this.state.essayText.toLowerCase();
    // Make a copy of the essay text to be used for checking different parameters(the ones containinh symbols or spaces)
    let essay = essayLowerCaps;
    // Remove all symbols with white spaces
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");

    // Initiate an empty pattern to be replaced by the word looked for
    let wordPattern = "";
    // Check if the parameters have been added by the lecturer, and if he essay contains them
    if (keyTerm != "") {
      keyTerm = keyTerm.toLowerCase();
      // Check if the topic term contains more than one word, as well as special characters such as - or .
      if (keyTerm.match(/^[a-zA-Z]*$/) == null) {
        // If the lectures input containe more than one words, check to find it in the initial text before formating
        if (essayLowerCaps.includes(keyTerm)) {
          console.log("PARAMETER PRESENT");
          parametersCount += 1;
        }
      } else {
        // create a pattern for the lecturers input to be found inside the text
        wordPattern = new RegExp("( |^)" + keyTerm + "( |$)");
        // Check if the parameter is present in the essay, and record in the state if it is
        if (essay.match(wordPattern) != null) {
          console.log("PARAMETER PRESENT");
          parametersCount += 1;
        }
      }
    }

    return parametersCount;
  }

  // // Helper function to cehck for individual search terms
  // checkForParameter(keyTerm) {
  //   // keep track of the number of parameters present
  //   // let parametersCount = 0;
  //   // Convert the whole essay to lowercase words, to ease the search for each term
  //   let essayLowerCaps = this.state.essayText.toLowerCase();
  //   // Make a copy of the essay text to be used for checking different parameters(the ones containinh symbols or spaces)
  //   let essay = essayLowerCaps;
  //   // Remove all symbols with white spaces
  //   essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
  //   // Remove multiple spaces with single space to lead to correct word count
  //   essay = essay.replace(/[ ]{2,}/g, " ");

  //   // Initiate an empty pattern to be replaced by the word looked for
  //   let wordPattern = "";
  //   // Check if the parameters have been added by the lecturer, and if he essay contains them
  //   if (keyTerm != "") {
  //     keyTerm = keyTerm.toLowerCase();
  //     // Check if the topic term contains more than one word, as well as special characters such as - or .
  //     if (keyTerm.match(/^[a-zA-Z]*$/) == null) {
  //       // If the lectures input containe more than one words, check to find it in the initial text before formating
  //       if (essayLowerCaps.includes(keyTerm)) {
  //         console.log("PARAMETER PRESENT");
  //         this.state.parametersPresentCount += 1;
  //       }
  //     } else {
  //       // create a pattern for the lecturers input to be found inside the text
  //       wordPattern = new RegExp("( |^)" + keyTerm + "( |$)");
  //       // Check if the parameter is present in the essay, and record in the state if it is
  //       if (essay.match(wordPattern) != null) {
  //         console.log("PARAMETER PRESENT");
  //         this.state.parametersPresentCount += 1;
  //       }
  //     }
  //   }
  // }

  countPrepositions() {
    let essay = this.state.essayText.toLowerCase();
    const prepositions = [
      "About",
      "After",
      "Ago",
      "Around",
      "At",
      "Before",
      "By",
      "Circa",
      "During",
      "Following",
      "For",
      "From",
      "Gone",
      "In",
      "On",
      "Past",
      "Prior to",
      "Since",
      "Until",
      "till",
      "Up to",
      "Up until",
      "Aboard",
      "Above",
      "Across",
      "Against",
      "Alongside",
      "Amid",
      "Among",
      "Apart from",
      "Astride",
      "At",
      "Atop",
      "Behind",
      "Below",
      "Beneath",
      "Beside",
      "Between",
      "Beyond",
      "By",
      "Close to",
      "Far",
      "Far from",
      "Forward of",
      "From",
      "In",
      "In between",
      "In front of",
      "Inside",
      "Into",
      "Minus",
      "Near",
      "Near to",
      "Next to",
      "Of",
      "Off",
      "On",
      "On board",
      "On top of",
      "Onto",
      "Upon",
      "Opposite",
      "Out",
      "Out of",
      "Outside",
      "Outside of",
      "Over",
      "Round",
      "Through",
      "Throughout",
      "To",
      "Together with",
      "Toward",
      "towards",
      "Under",
      "Underneath",
      "Up against",
      "With",
      "Within",
      "Without",
      "Above",
      "Across",
      "Against",
      "Ahead",
      "Along",
      "Along with",
      "Amid",
      "Around",
      "Away",
      "Away from",
      "Behind",
      "Below",
      "Beneath",
      "By means of",
      "Down",
      "Further to",
      "In between",
      "Into",
      "Off",
      "Off of",
      "On",
      "Onto",
      "Over",
      "Out of",
      "Past",
      "Round",
      "Through",
      "Toward/towards",
      "Under",
      "Up",
      "Via",
      "About",
      "According to",
      "Anti",
      "As",
      "As for",
      "As per",
      "As to",
      "As well as",
      "Aside from",
      "Bar",
      "Barring",
      "Because of",
      "Besides",
      "But for",
      "By",
      "But",
      "Concerning",
      "Considering",
      "Contrary to",
      "Counting",
      "Cum",
      "Depending on",
      "Despite",
      "Due to",
      "Except",
      "Except for",
      "Excepting",
      "Excluding",
      "Given",
      "In addition to",
      "in case of",
      "In face of",
      "In favor of",
      "in favour of",
      "In light of",
      "In spite of",
      "In view of",
      "Including",
      "Instead of",
      "Less",
      "Like",
      "Notwithstanding",
      "Of",
      "On account of",
      "On behalf of",
      "Other than",
      "Owing to",
      "Pending",
      "Per",
      "Plus",
      "Preparatory to",
      "Pro",
      "Re",
      "Regarding",
      "Regardless of",
      "Save",
      "Save for",
      "Saving",
      "Than",
      "Thanks to",
      "Unlike",
      "Versus",
      "With",
      "With reference to",
      "With regard to",
      "Worth",
    ];
    // Store all the prepositions in an array to be looked for inside the essay
    const multiWordsPrepositions = [
      "Prior to",
      "Up to",
      "Up until",
      "Apart from",
      "Close to",
      "Far from",
      "Forward of",
      "In between",
      "In front of",
      "Near to",
      "Next to",
      "On board",
      "On top of",
      "Out of",
      "Outside of",
      "Together with",
      "Up against",
      "Along with",
      "Away from",
      "By means of",
      "Further to",
      "In between",
      "Off of",
      "Out of",
      "According to",
      "As for",
      "As per",
      "As to",
      "As well as",
      "Aside from",
      "Because of",
      "But for",
      "Contrary to",
      "Depending on",
      "Due to",
      "Except for",
      "In addition to",
      "in case of",
      "In face of",
      "In favor of",
      "in favour of",
      "In light of",
      "In spite of",
      "In view of",
      "Instead of",
      "On account of",
      "On behalf of",
      "Other than",
      "Owing to",
      "Preparatory to",
      "Regardless of",
      "Save for",
      "Thanks to",
      "With reference to",
      "With regard to",
    ];

    const singleWordPrepositions = [
      "About",
      "After",
      "Ago",
      "Around",
      "At",
      "Before",
      "By",
      "Circa",
      "During",
      "Following",
      "For",
      "From",
      "Gone",
      "In",
      "On",
      "Past",
      "Since",
      "Until",
      "till",
      "Aboard",
      "Above",
      "Across",
      "Against",
      "Alongside",
      "Amid",
      "Among",
      "Astride",
      "Atop",
      "Below",
      "Beneath",
      "Beside",
      "Between",
      "Beyond",
      "Far",
      "Inside",
      "Minus",
      "Near",
      "Upon",
      "Opposite",
      "Out",
      "Outside",
      "Over",
      "Through",
      "Throughout",
      "To",
      "Toward",
      "towards",
      "Underneath",
      "With",
      "Within",
      "Without",
      "Ahead",
      "Along",
      "Away",
      "Behind",
      "Down",
      "Into",
      "Off",
      "Onto",
      "Round",
      "Under",
      "Up",
      "Via",
      "Anti",
      "As",
      "Bar",
      "Barring",
      "Besides",
      "But",
      "Concerning",
      "Considering",
      "Counting",
      "Cum",
      "Despite",
      "Except",
      "Excepting",
      "Excluding",
      "Given",
      "Including",
      "Less",
      "Like",
      "Notwithstanding",
      "Of",
      "Pending",
      "Per",
      "Plus",
      "Pro",
      "Re",
      "Regarding",
      "Save",
      "Saving",
      "Than",
      "Unlike",
      "Versus",
      "Worth",
    ];
    // console.log(essay);
    let pattern = "";
    let prepositionsPresent = [];
    multiWordsPrepositions.forEach((preposition) => {
      // str.match(new RegExp("thanks to me","g"))
      // Create a regular expresion pattern containing the multiline preposition looked for
      pattern = new RegExp(preposition.toLowerCase(), "g");

      // Check if the preposition is present, and how many times, then add it to the total count of prepositions
      if (essay.match(pattern) != null) {
        this.state.prepositionsCount += essay.match(pattern).length;
        prepositionsPresent.push(preposition);
      }

      // Remove present prepositions from the essays, to be able to check for the single prepositions after
      // TODO
    });

    console.log("prepositionsCount:", this.state.prepositionsCount);
    console.log(prepositionsPresent);
    console.log(essay);

    // Remove the multi word prepositions from he rext in order to accurately count the singli word prepositions
    prepositionsPresent.forEach((preposition) => {
      essay = essay.replaceAll(preposition.toLowerCase(), "");
    });
    console.log(essay);

    singleWordPrepositions.forEach((preposition) => {
      // prepositionPattern = new RegExp("( |^)" + preposition.toLowerCase() + "( |$)");
      let prepositionPattern = new RegExp(
        "( |^)" + preposition.toLowerCase() + "( |$)"
      );
      if (essay.match(prepositionPattern)) {
        // Increase the count if the preposition is present
        console.log("singleline", preposition);
        this.state.prepositionsCount += 1;
      }
    });
    console.log(this.state.prepositionsCount);
  }

  // Count the number of paragraphs
  countParagraphs() {
    this.state.paragraphsCount = this.state.essayText.split(/\n/).length;
  }

  // ------ STATUS: NOT FINISHED ---------
  /* IDEEA:
    - Check words against normal dictionary ( make my own function )
  */
  //  V1, using one library
  // checkSpelling() {
  //   const spelling = require("spelling");
  //   const dictionary = require("./dictionaries/en_US.js");
  //   const dict = new spelling(dictionary);

  //   // Remove all symbols from the essay to allow it to be checked for spelling mistakes( while acounting for "'" and "-" inside names )
  //   let formattedEssay = this.state.essayText.replace(/[^a-zA-Z0-9 '\-]/g, "");

  //   // Turn the essay into an array of individual words, to be checked for spelling against a dictionary
  //   formattedEssay = formattedEssay.split(/\s+/);

  //   // Remove double spaces from the essay
  //   console.log("\nFormatedEssay:\n", formattedEssay);
  //   // Iterate through the essay and check each word for spelling
  //   formattedEssay.forEach((element) => {
  //     console.log("\n\n");
  //     // console.log(element);
  //     dict.lookup(element);
  //     if (dict.lookup(element).found) {
  //       // console.log(element, " speelled correcty!");
  //     } else {
  //       // If the word is spelled incorrectly, reflect it inside the state
  //       this.state.spellingMistakesCount += 1;
  //       console.log("word: ", element, " spelled incorrectly");
  //     }
  //   });
  //   console.log(
  //     "\nNumber of spelling mistakes!:",
  //     this.state.spellingMistakesCount
  //   );
  // }

  /* TODO
    - Add errors
    - add error for when it's empty as well
  */
  // Function to check whether the number of words inside the text is in the range expected by the lecturer
  checkWordsRange() {
    // Start by checking that the input provided by the lecturer is a number

    console.log(/^\d+$/.test(this.state.minNumberWords));
    console.log(/^\d+$/.test(this.state.maxNumberWords));
    console.log(
      this.state.essayWordCount,
      this.state.minNumberWords,
      this.state.maxNumberWords
    );

    // If both input are numbers, continue with the function. Otherwisem throw and error
    if (
      /^\d+$/.test(this.state.minNumberWords) &&
      /^\d+$/.test(this.state.maxNumberWords)
    ) {
      console.log("Both inputs are correct!");
      // Check whether the essay is within range
      if (
        this.state.essayWordCount > this.state.minNumberWords &&
        this.state.essayWordCount < this.state.maxNumberWords
      ) {
        console.log("Essay word count between range!");
      }
    } else {
      console.log("One or both inputs incorrect! Try again");
    }
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
        <View style={styles.body}>
          <Text style={styles.title}>AUTOMATED ESSAY MARKING SYSTEM</Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.subtitle}>INSERT ESSAY</Text>
            </View>

            <View style={styles.row}>
              <TextInput
                style={styles.input}
                multiline={true}
                onChangeText={(essayText) => this.setState({ essayText })}
                value={this.state.essayText}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.subtitle}>INSERT TOPIC RELATED WORDS</Text>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Key term 1:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInput1) =>
                    this.setState({ lecturerInput1 })
                  }
                  value={this.state.lecturerInput1}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key term 2:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInput2) =>
                    this.setState({ lecturerInput2 })
                  }
                  value={this.state.lecturerInput2}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key term 3:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInput3) =>
                    this.setState({ lecturerInput3 })
                  }
                  value={this.state.lecturerInput3}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key term 4:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInput4) =>
                    this.setState({ lecturerInput4 })
                  }
                  value={this.state.lecturerInput4}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key term 5:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInput5) =>
                    this.setState({ lecturerInput5 })
                  }
                  value={this.state.lecturerInput5}
                ></TextInput>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.subtitle}>INSERT TOPIC RELATED PHRASES</Text>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Key phrase 1:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInputPhrase1) =>
                    this.setState({ lecturerInputPhrase1 })
                  }
                  value={this.state.lecturerInputPhrase1}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key phrase 2:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInputPhrase2) =>
                    this.setState({ lecturerInputPhrase2 })
                  }
                  value={this.state.lecturerInputPhrase2}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key phrase 3:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInputPhrase3) =>
                    this.setState({ lecturerInputPhrase3 })
                  }
                  value={this.state.lecturerInputPhrase3}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key phrase 4:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInputPhrase4) =>
                    this.setState({ lecturerInputPhrase4 })
                  }
                  value={this.state.lecturerInputPhrase4}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Key phrase 5:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(lecturerInputPhrase5) =>
                    this.setState({ lecturerInputPhrase5 })
                  }
                  value={this.state.lecturerInputPhrase5}
                ></TextInput>
              </View>
            </View>

            {/* Range oof words number */}
            <View style={styles.row}>
              <Text style={styles.subtitle}>
                INSERT EXPECTED WORD COUNT RANGE
              </Text>
            </View>
            <View style={styles.rowStart}>
              <View>
                <Text style={styles.label}>Min:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(minNumberWords) =>
                    this.setState({ minNumberWords })
                  }
                  value={this.state.minNumberWords}
                  keyboardType="numeric"
                  maxLength={5}
                ></TextInput>
              </View>
              <View>
                <Text style={styles.label}>Min:</Text>
                <TextInput
                  style={styles.lecturerInput}
                  onChangeText={(maxNumberWords) =>
                    this.setState({ maxNumberWords })
                  }
                  value={this.state.maxNumberWords}
                  keyboardType="numeric"
                  maxLength={5}
                ></TextInput>
              </View>
            </View>

            <View style={styles.rowEnd}>
              {/* <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>{"ESSAY TYPE"}</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => this.processText()}
              >
                <Text style={styles.buttonText}>{"SUBMIT"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                // onPress={() =>
                //   this.props.navigation.navigate("Feedback", {
                //     number: 2,
                //   })
                // }
              >
                <Text style={styles.buttonText}>{"FEEDBACK PAGE"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#F5F5F5",
    minHeight: "100%",
  },
  input: {
    height: 500,
    fontSize: 16, // CHANGE
    padding: 10,
    backgroundColor: "#ffffff",
    width: "100%",
    borderWidth: 3,
    borderColor: "#ABABAB",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: "#444444",
    lineHeight: 25,
  },

  container: {
    // backgroundColor: "#F1F1F1",
    flex: 1,
    flexDirection: "column",
    alignItems: "center", // keep content in the middle
    marginTop: 10,
    maxWidth: 1100,
    width: "100%",
    margin: "auto",
    marginBottom: 50,
    backgroundColor: "#F1F1F1",

    // borderLeftWidth: 3,
    // borderLeftColor: "#E3E3E3",
    paddingLeft: 40,
    // borderRightWidth: 3,
    // borderRightColor: "#E3E3E3",
    paddingRight: 40,
    paddingBottom: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",

    // minWidth: "80vw",
  },
  row: {
    // backgroundColor: "#E9E9E9",
    flexDirection: "row",
    // minWidth: 600,
    justifyContent: "space-between",
    // marginTop: 40,
    width: "100%",
    flexWrap: "wrap",
    gap: 8,
  },
  rowEnd: {
    flexDirection: "row",
    justifyContent: "end",
    width: "100%",
  },
  rowStart: {
    flexDirection: "row",
    // minWidth: 600,
    // justifyContent: "space-between",
    // marginTop: 40,
    width: "100%",
    flexWrap: "wrap",
    gap: 25,
    marginBottom: 25,
  },
  rowVertical: {
    flexDirection: "columns",
    // minWidth: 600,
    justifyContent: "space-between",
    marginTop: 40,
    backgroundColor: "#E9E9E9",
  },
  lecturerInput: {
    backgroundColor: "#ffffff",
    padding: 7,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ABABAB",
    color: "#444444",
  },
  title: {
    backgroundColor: "#E9E9E9",

    fontSize: 30,
    width: "100%",
    textAlign: "center",
    padding: 40,
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 40,
    lineHeight: 47,
    /* identical to box height */
    letterSpacing: "0.325em",
    color: "#2EA7EB",

    boxShadow: "0px 10px 5px rgba(0, 0, 0, 0.25)",
    marginBottom: 20,
  },
  primaryButton: {
    textAlign: "center",
    minWidth: 169,
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 2.5,
    borderColor: "#2EA7EB",
  },

  buttonText: {
    color: "#2EA7EB",

    fontSize: "14",
    // fontamily: Roboto-Medium;
    letterSpacing: 1.25,
  },
  subtitle: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 18,
    letterSpacing: "0.16em",
    marginTop: 30,
    marginBottom: 10,
    // color: "#444444",
    color: "#2EA7EB",
  },
  label: {
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 18,
    // letterSpacing: "0.16em",

    marginBottom: 2,
    color: "#444444",
  },
});
