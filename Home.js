import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  Button,
} from "react-native";
import React, { Component } from "react";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // Store a number of parameters required by the algorithm inside the state
    this.state = {
      essayText: "",
      isLoading: false,
      essayWordCount: "",
      essaySentenceCount: "",
      averageSentenceLength: "",
      averageWordLengthCount: "",
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
      // Keep track of the range of words the lecturer expects the essay to be
      minNumberWords: "",
      maxNumberWords: "",
      prepositionsCount: 0,
      referencesCount: 0,
      punctuationErrorCount: 0,
      uniqueWordsPercentage: 0,
      sentenceCount: 0,
      overallGrade: 0,
      // Alert box flag
      errorMessage: "Something went wrong",
      modalVisible: false,
    };
  }

  // Add a toggle function to set the visibility for the user alerts
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  // main function calling all the necesarry functions for extracting the features
  processText() {
    // check if the essay, minimum and maximum word range inputs have been added
    if (
      this.state.essayText.trim() == "" ||
      isNaN(this.state.minNumberWords) ||
      isNaN(this.state.maxNumberWords) ||
      this.state.minNumberWords.trim() == "" ||
      this.state.maxNumberWords.trim() == ""
    ) {
      this.setModalVisible(!modalVisible);
      return null;
    }

    // Count the total number of words
    this.countWords();

    // calculate the average word length
    this.averageWordLength();

    // Count the total number of sentences
    this.countSentences();

    // Check how many of the lecture's parameters are present inside the essay
    this.checkForLecturersParameters();

    // Count the number of paragraphs
    this.countParagraphs();

    // Count the number of prepositions
    this.countPrepositions();

    // Count the number of references
    this.countReferences();

    // Count the number of punctuation errors
    this.countPunctuationMistakes();

    // Calculate the average sentece length
    this.calculateaAverageSentenceLength();

    // Calculate the percentage of unique words
    this.percentageUniqueWords();

    // Calculate the overall grade of the essay
    this.calculateFinalGrade();

    // Store the data about all the features extracted to be send to the feedback page
    const results = {
      essayWordCount: this.state.essayWordCount,
      sentenceCount: this.state.sentenceCount,
      paragraphsCount: this.state.paragraphsCount,
      prepositionsCount: this.state.prepositionsCount,
      referencesCount: this.state.referencesCount,
      averageSentenceLength: this.state.averageSentenceLength,
      averageWordLengthCount: this.state.averageWordLengthCount,
      keyTermsPresent: this.state.keyTermsPresent,
      keyPhrasesPresent: this.state.keyPhrasesPresent,
      punctuationErrorCount: this.state.punctuationErrorCount,
      uniqueWordsPercentage: this.state.uniqueWordsPercentage,
      overallGrade: this.state.overallGrade,
    };

    // Direct the user to the feedback page and pass the results to that file
    this.props.navigation.navigate("Feedback", {
      results: results,
    });
  }

  // Compute the final grade
  calculateFinalGrade() {
    // Create a general set of variable that gives different rules for the essay depending on its length
    let essayLengthRules = 0;

    // Decide which catergory the essay should belong to during the calculations by the words range provided by the user
    if (this.state.maxNumberWords <= 800) {
      essayLengthRules = 500;
    } else if (
      this.state.maxNumberWords <= 1400 ||
      (this.state.minNumberWords >= 800 && this.state.minNumberWords <= 1000)
    ) {
      essayLengthRules = 1000;
    } else if (
      this.state.maxNumberWords > 1500 &&
      this.state.maxNumberWords < 2000 &&
      this.state.minNumberWords > 1000
    ) {
      essayLengthRules = 1500;
    } else if (this.state.maxNumberWords > 2000) {
      essayLengthRules = 2000;
    } else {
      essayLengthRules = 500;
    }

    // Create an object to store the grade for each feature
    let grades = {
      essayWordCount: 0,
      keyTermsGrade: 0,
      keyPhrasesGrade: 0,
      punctuationGrade: 0,
      referencesGrades: 0,
      paragraphsGrade: 0,
      percentageUniqueWordsGrade: 0,
      prepositionGrade: 0,
      sentenceCountGrade: 0,
      averageSentenceLengthGrade: 0,
      averageWordLengthGrade: 0,
    };

    // -----------------------------
    // Calculate the grade for the word count
    // -----------------------------
    // Excelent - 100 points
    // If the word count is in the range expected by the educator
    if (
      this.state.essayWordCount >= this.state.minNumberWords &&
      this.state.essayWordCount <= this.state.maxNumberWords
    ) {
      grades.essayWordCount = 100;
    }
    // Accomplishes - 75 points
    // If the word count is in 10 % range of the expected word count
    else if (
      this.state.essayWordCount >= (this.state.minNumberWords * 90) / 100 &&
      this.state.essayWordCount <= (this.state.maxNumberWords * 110) / 100
    ) {
      grades.essayWordCount = 75;
    }

    // Capable - 50 points
    // If the word count is off by more than 10% and less than 30%
    else if (
      this.state.essayWordCount >= (this.state.minNumberWords * 70) / 100 &&
      this.state.essayWordCount <= (this.state.maxNumberWords * 130) / 100
    ) {
      grades.essayWordCount = 50;
    }

    // Beginner - 25 points
    // If the word count is off by more than 35 percent
    else if (
      this.state.essayWordCount < (this.state.minNumberWords * 70) / 100 ||
      this.state.essayWordCount > (this.state.maxNumberWords * 130) / 100
    ) {
      grades.essayWordCount = 25;
    }

    // -----------------------------
    // Calculate grade for key terms
    // -----------------------------
    // Assign differnt grades depending on how many of the topic terms are present in the essay
    if (this.state.keyTermsPresent == 5) {
      grades.keyTermsGrade = 100;
    } else if (this.state.keyTermsPresent == 4) {
      grades.keyTermsGrade = 75;
    } else if (this.state.keyTermsPresent >= 2) {
      grades.keyTermsGrade = 50;
    } else if (this.state.keyTermsPresent == 1) {
      grades.keyTermsGrade = 25;
    } else {
      grades.keyTermsGrade = 0;
    }
    // -----------------------------
    // Calculate grade for key phrases
    // -----------------------------
    // Assign differnt grades depending on how many of the topic phrases are present in the essay
    if (this.state.keyPhrasesPresent == 5) {
      grades.keyPhrasesGrade = 100;
    } else if (this.state.keyPhrasesPresent == 4) {
      grades.keyPhrasesGrade = 75;
    } else if (this.state.keyPhrasesPresent >= 2) {
      grades.keyPhrasesGrade = 50;
    } else if (this.state.keyPhrasesPresent == 1) {
      grades.keyPhrasesGrade = 25;
    } else {
      grades.keyPhrasesGrade = 0;
    }

    // -------------------------------
    // Calculate grade for punctuation
    // ----------------------–--------
    // Assign differnt grades depending on how many punctuation mistakes the user has
    if (this.state.punctuationErrorCount == 0) {
      grades.punctuationGrade = 100;
    } else if (
      this.state.punctuationErrorCount == 1 ||
      this.state.punctuationErrorCount == 2
    ) {
      grades.punctuationGrade = 75;
    } else if (
      this.state.punctuationErrorCount > 2 &&
      this.state.punctuationErrorCount <= 6
    ) {
      grades.punctuationGrade = 50;
    } else if (
      this.state.punctuationErrorCount > 6 &&
      this.state.punctuationErrorCount < 10
    ) {
      grades.punctuationGrade = 25;
    } else {
      grades.punctuationGrade = 0;
    }

    // -------------------------------
    // Calculate grade for references count
    // ----------------------–--------

    // Rules of reference count for essays in the 500 words range
    if (essayLengthRules == 500) {
      // 100 - Excelente ecenariot
      if (this.state.referencesCount >= 3) {
        grades.referencesGrades = 100;
      } else if (this.state.referencesCount == 2) {
        grades.referencesGrades = 75;
      } else if (this.state.referencesCount == 1) {
        grades.referencesGrades = 50;
      } else if (this.state.referencesCount == 0) {
        grades.referencesGrades = 25;
      }
    }

    // Rules of reference count for essays in the 1000 words range
    if (essayLengthRules == 1000) {
      // 100 - Excelente ecenariot
      if (this.state.referencesCount >= 5) {
        grades.referencesGrades = 100;
      } else if (this.state.referencesCount >= 3) {
        grades.referencesGrades = 75;
      } else if (this.state.referencesCount == 2) {
        grades.referencesGrades = 50;
      } else if (this.state.referencesCount < 2) {
        grades.referencesGrades = 25;
      } else if (this.state.referencesCount == 0) {
        grades.referencesGrades = 0;
      }
    }

    // Rules of reference count for essays in the 1500 words range
    if (essayLengthRules >= 1500) {
      if (this.state.referencesCount >= 7) {
        grades.referencesGrades = 100;
      } else if (this.state.referencesCount >= 5) {
        grades.referencesGrades = 75;
      } else if (this.state.referencesCount >= 3) {
        grades.referencesGrades = 50;
      } else if (this.state.referencesCount >= 1) {
        grades.referencesGrades = 25;
      } else if (this.state.referencesCount == 0) {
        grades.referencesGrades = 0;
      }
    }

    // -------------------------------
    // Rules for paragraphs count
    // -------------------------------
    //  Assign differnt grades depending on the number of paragraphs contained in the essay
    if (this.state.paragraphsCount >= 3) {
      grades.paragraphsGrade = 100;
    } else if (this.state.paragraphsCount == 2) {
      grades.paragraphsGrade = 50;
    } else if (this.state.paragraphsCount < 2) {
      grades.paragraphsGrade = 0;
    }

    // -------------------------------
    // Rules of percentage of unique words
    // -------------------------------
    //  Assign differnt grades depending on percentage of unique words
    if (this.state.uniqueWordsPercentage >= 45) {
      grades.percentageUniqueWordsGrade = 100;
    } else if (this.state.uniqueWordsPercentage > 25) {
      grades.percentageUniqueWordsGrade = 75;
    } else if (this.state.uniqueWordsPercentage > 20) {
      grades.percentageUniqueWordsGrade = 50;
    } else if (this.state.uniqueWordsPercentage <= 20) {
      grades.percentageUniqueWordsGrade = 25;
    }

    // -------------------------------
    // Rules of prepositons
    // -------------------------------
    // Calculate the raport between words and preposition, the result reresenting how many words are on average for each preposition
    let wordsPerPreposition = Math.round(
      this.state.essayWordCount / this.state.prepositionsCount
    );

    //  Assign differnt grades by checking if the number of prepositions for a given number of word is correct.
    if (wordsPerPreposition >= 10 && wordsPerPreposition <= 15) {
      grades.prepositionGrade = 100;
    } else if (wordsPerPreposition < 5 || wordsPerPreposition > 30) {
      grades.prepositionGrade = 25;
    } else if (wordsPerPreposition < 8 || wordsPerPreposition > 25) {
      grades.prepositionGrade = 50;
    } else if (wordsPerPreposition < 10 || wordsPerPreposition > 15) {
      grades.prepositionGrade = 75;
    }

    // -------------------------------
    // Rules for number of sentences
    // -------------------------------
    // Calculate the average amount of sentences per paragraph
    let sentencePerParagraphAverage = Math.round(
      this.state.sentenceCount / this.state.paragraphsCount
    );

    // Assign grades for the sentence count by determining if the paragraphs have the expected number of sentences
    if (sentencePerParagraphAverage >= 3 && sentencePerParagraphAverage <= 5) {
      grades.sentenceCountGrade = 100;
    } else if (
      sentencePerParagraphAverage >= 2 &&
      sentencePerParagraphAverage <= 7
    ) {
      grades.sentenceCountGrade = 50;
    } else {
      grades.sentenceCountGrade = 25;
    }

    // -------------------------------
    // Rules for sentence lenght
    // -------------------------------
    // Assign grades for the sentence length by checking if it falls between certain word count ranges
    if (
      this.state.averageSentenceLength >= 15 &&
      this.state.averageSentenceLength <= 20
    ) {
      grades.averageSentenceLengthGrade = 100;
    } else if (
      this.state.averageSentenceLength >= 10 &&
      this.state.averageSentenceLength <= 25
    ) {
      grades.averageSentenceLengthGrade = 75;
    } else {
      grades.averageSentenceLengthGrade = 50;
    }

    // -------------------------------
    // Rules for average word length
    // -------------------------------
    // Assign grades for the words length by checking if the average falls between certain expected ranges
    if (
      this.state.averageWordLengthCount >= 5 &&
      this.state.averageWordLengthCount <= 12
    ) {
      grades.averageWordLengthGrade = 100;
    } else if (
      this.state.averageWordLengthCount >= 4 &&
      this.state.averageWordLengthCount <= 16
    ) {
      grades.averageWordLengthGrade = 75;
    } else {
      grades.averageWordLengthGrade = 50;
    }

    // Set appropriate weights for each of the features depending on their importance
    let weights = {
      essayWordCount: 0.12,
      sentenceCount: 0.03,
      paragraphsCount: 0.12,
      prepositionCount: 0.04,
      referencesCount: 0.1,
      averageSentenceLength: 0.06,
      averageWordLength: 0.04,
      percentageUniqueWords: 0.04,
      keyTermsPresent: 0.17,
      keyPhrasesPresent: 0.17,
      punctuationErrorCount: 0.15,
    };

    // Calculate the overall grade by multiplying each grade by its correspondent weight, and adding them together
    let grade =
      grades.essayWordCount * weights.essayWordCount +
      grades.keyTermsGrade * weights.keyTermsPresent +
      grades.keyPhrasesGrade * weights.keyPhrasesPresent +
      grades.punctuationGrade * weights.punctuationErrorCount +
      grades.referencesGrades * weights.referencesCount +
      grades.paragraphsGrade * weights.paragraphsCount +
      grades.percentageUniqueWordsGrade * weights.percentageUniqueWords +
      grades.prepositionGrade * weights.prepositionCount +
      grades.sentenceCountGrade * weights.sentenceCount +
      grades.averageSentenceLengthGrade * weights.averageSentenceLength +
      grades.averageWordLengthGrade * weights.averageWordLength;

    // Reflect the overall grade in the state to be sent to the feedback page
    this.state.overallGrade = (grade / 10).toFixed(1);
  }

  // Calculate the average sentence length
  calculateaAverageSentenceLength() {
    // Divide the number of words in the essay by the number of sentnces in order to get the average sentence length
    this.state.averageSentenceLength = Math.round(
      this.state.essayWordCount / this.state.sentenceCount
    );
  }

  // Count the punctuation mistakes
  countPunctuationMistakes() {
    let essay = this.state.essayText;
    // define a pattern that looks for any potential punctuation mistakes
    let pattern = new RegExp(/[.?!]{2,}/g);
    // Find all the instances where a potential punctuation mistake could occure
    let punctuationPotentialErrorsArray = essay.match(pattern);

    // Store all the correct punctuation a sentence could end with
    let correctPuntuationArray = [
      "?!",
      "...",
      ").",
      ")?",
      ")!",
      ")...",
      ")?!",
      ".(",
      "?(",
      "!(",
      "...(",
      "?!(",
      "].",
      "]...",
      "]?",
      "]!",
      "]?!",
      ".[",
      "...[",
      "?[",
      "![",
      "?![",
      '".',
      '"?',
      '"!',
      '"?!',
      '..."',
      '."',
      '?"',
      '!"',
      '?!"',
      '..."',
    ];

    // Check whether the sentence endings are correct or not by checking the punctuation insie the sentences against the allowed punctuation array elements
    if (punctuationPotentialErrorsArray != null) {
      punctuationPotentialErrorsArray.forEach((element) => {
        if (!correctPuntuationArray.includes(element)) {
          // If a punctuation mistake is found, reflect that in the state
          this.state.punctuationErrorCount += 1;
        }
      });
    }
  }

  // Count the number of references
  countReferences() {
    let essay = this.state.essayText;

    // Create a pattern for detecting all the inline references
    let pattern = new RegExp(/\(\D+\d{4}\)/g);

    // Find all the inside the essay
    let citations = essay.match(pattern);

    // If citations are found, count them and relect thsis inside the state
    if (citations == null) {
      this.state.referencesCount = 0;
    } else {
      this.state.referencesCount = citations.length;
    }
  }

  // Calculate the percenta of unique words
  percentageUniqueWords() {
    let essay = this.state.essayText;
    // Create an object to store all the words inside the essay and the amount of times they are present
    let wordOccurancesCount = {};
    // Replace all the characters with an empty space before preceding to counting the total number of words
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");
    // turn all the words to lowercase to ease the search
    essay = essay.toLowerCase();
    // split the essay into individual words
    essay = essay.split(" ");

    // Sort the array to esay the search
    essay.sort();

    // Loop through the array of words and count how many times each of them appears in the essay
    for (let word of essay) {
      // check if the word is already in accounted for, otherwise add it
      if (wordOccurancesCount[word]) {
        // Increase the number of times the word is present
        wordOccurancesCount[word] += 1;
      } else {
        // If the word is not present, add it
        wordOccurancesCount[word] = 1;
      }
    }

    let uniqueWordsCount = 0;
    // loop through the object and count how many unique words there are
    for (let wordKey in wordOccurancesCount) {
      // Count all the unique words
      if (wordOccurancesCount[wordKey] == 1) {
        uniqueWordsCount += 1;
      }
    }

    // Count the number of words, words that appear multiple times only being counted once
    let wordOccurancesCountLength = Object.keys(wordOccurancesCount).length;
    // Calculate what percentage of the words are unique (appear only once in the essay)
    let percentageUniqueWords = Math.round(
      (uniqueWordsCount / wordOccurancesCountLength) * 100
    );

    // Store the percentage of unique words inside the state
    this.state.uniqueWordsPercentage = percentageUniqueWords;
  }

  // Count the total number of words inside the essay
  countWords() {
    let essay = this.state.essayText;
    // Replace all the characters with an empty space before preceding to counting the total number of words
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");

    // Store the number of words inside the state
    this.state.essayWordCount = essay.split(" ").length;
  }

  // Check the average length of the words
  averageWordLength() {
    let essay = this.state.essayText;

    // Replace all the characters with an empty space before preceding to counting the total number of words
    essay = essay.replace(/[^a-zA-Z0-9 ]/g, "");
    // Remove multiple spaces with single space to lead to correct word count
    essay = essay.replace(/[ ]{2,}/g, " ");
    // store all the words inside an array to be able to calculate the total number
    essay = essay.split(" ");

    let totalWordLength = 0;
    // Calculate the length of each word and add it together to be able to calculater the average
    essay.forEach((word) => {
      totalWordLength += word.length;
    });

    // Calculate the average word  lentgh by dividing the number of characters by the number of words
    this.state.averageWordLengthCount = Math.round(
      totalWordLength / this.state.essayWordCount
    );
  }

  // Count the number of sentnces
  countSentences() {
    let essay = this.state.essayText;

    // Use pattern matching to get all the sentences by checking for sentence endings symbols
    let sentences = essay.match(/\w[.!?]\s*\$*/g);

    // Store the number of sentences inside the state
    if (sentences != null) {
      this.state.sentenceCount = essay.match(/\w[.!?]\s*\$*/g).length;
    } else {
      this.state.sentenceCount = 0;
    }
  }

  // Check for the topic related parameters
  checkForLecturersParameters() {
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

    // Reflect this inside the state
    this.state.keyTermsPresent = keyTermsPresent;
    this.state.keyPhrasesPresent = keyPhrasesPresent;
  }

  // Check for individual topic or phrase key term
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
          parametersCount += 1;
        }
      } else {
        // create a pattern for the lecturers input to be found inside the text
        wordPattern = new RegExp("( |^)" + keyTerm + "( |$)");
        // Check if the parameter is present in the essay, and record in the state if it is
        if (essay.match(wordPattern) != null) {
          parametersCount += 1;
        }
      }
    }

    // Return the parameter count
    return parametersCount;
  }

  // Count the number of prepositions
  countPrepositions() {
    // Set the essay to lowercase to avoid errors during the search for prepositions
    let essay = this.state.essayText.toLowerCase();

    // Store all the prepositions inside an array
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
    // Store all prepositions containing multiple words in an array
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

    // Store all the one word prepositions in an arrray
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

    let pattern = "";
    let prepositionsPresent = [];

    // Loop through the array of prepositions cotaining more than one word and check whether they are present inside the essay
    multiWordsPrepositions.forEach((preposition) => {
      // Create a pattern for each preposition to be used for searching the essay
      pattern = new RegExp(preposition.toLowerCase(), "g");

      // Check if the preposition is present, and how many times, then add it to the total count of prepositions
      if (essay.match(pattern) != null) {
        this.state.prepositionsCount += essay.match(pattern).length;
        prepositionsPresent.push(preposition);
      }
    });

    // Remove the multi word prepositions from the essay in order to accurately count the single word prepositions
    prepositionsPresent.forEach((preposition) => {
      essay = essay.replaceAll(preposition.toLowerCase(), "");
    });

    // Loop through all the prepositions formed of 1 word and check whether they are present in the essay
    singleWordPrepositions.forEach((preposition) => {
      // Create a pattern for each prepositon to be looked for inside the essay
      let prepositionPattern = new RegExp(
        "( |^)" + preposition.toLowerCase() + "( |$)"
      );
      if (essay.match(prepositionPattern)) {
        this.state.prepositionsCount += 1;
      }
    });
  }

  // Count the number of paragraphs
  countParagraphs() {
    this.state.paragraphsCount = this.state.essayText.split(/\n/).length;
  }

  // Render the user inteface with the necessary elements
  render() {
    const { modalVisible } = this.state.modalVisible;
    return (
      <View style={styles.body}>
        {/* modal alert */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text>{this.state.errorMessage} </Text>
              <Button onPress={() => this.setModalVisible(!modalVisible)}>
                <Text>{"OK"}</Text>
              </Button>
            </View>
          </View>
          {/* </View> */}
        </Modal>

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
              maxLength={10000}
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
              <Text style={styles.label}>Max:</Text>
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
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => this.processText()}
            >
              <Text style={styles.buttonText}>{"SUBMIT"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
    fontSize: 16,
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    maxWidth: 1100,
    width: "100%",
    margin: "auto",
    marginBottom: 50,
    backgroundColor: "#F1F1F1",
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "100%",
    flexWrap: "wrap",
    gap: 25,
    marginBottom: 25,
  },
  rowVertical: {
    flexDirection: "columns",
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
    color: "#2EA7EB",
  },
  label: {
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 18,
    marginBottom: 2,
    color: "#444444",
  },

  // Modal alert box settings
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margintop: "10",
  },
  modalView: {
    margin: "20",
    backgroundColor: "white",
    padding: "40",
    alignItems: "center",
    border: "2",
  },
});
