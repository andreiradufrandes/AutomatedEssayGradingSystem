import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

import React, { Component } from "react";

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.route.params.results;
  }

  results = this.props.route.params.results;

  render() {
    return (
      // Display the grade and a feedback report
      <View style={styles.body}>
        <Text style={styles.title}>AUTOMATED ESSAY MARKING SYSTEM</Text>
        <View style={styles.container}>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>GRADE: </Text>
            <Text style={styles.gradeLabel}></Text>
            <Text style={styles.grade}> {this.state.overallGrade}/10</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableHeaderText}>FEATURE</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>FEATURE NUMBERS</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>WORD COUNT</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.essayWordCount}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>SENTENCE COUNT</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.sentenceCount}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>PARAGRAPHS COUNT</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.paragraphsCount}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>PREPOSITIONS COUNT</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.prepositionsCount}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>REFERENCES COUNT</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.referencesCount}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>
                  AVERAGE SENTENCE LENGTH
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.averageSentenceLength}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>AVERAGE WORD LENGTH</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.averageWordLengthCount}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>
                  PERCENTAGE UNIQUE WORDS
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.uniqueWordsPercentage} %
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>KEY TERMS PRESENT</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.keyTermsPresent}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>KEY PHRASES PRESENT</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.keyPhrasesPresent}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCellLabel}>
                <Text style={styles.tableCellText}>
                  PUNCTUATION ERROR COUNT
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>
                  {this.state.punctuationErrorCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default FeedbackScreen;

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    gap: 8,
    borderBottomWidth: 1,
    borderColor: "#E5E4E4",
    paddingBottom: 5,
  },
  tableCellText: {
    color: "rgb(68, 68, 68)",
  },
  tableCellLabel: {
    flexGrow: 2,
  },
  tableHeaderText: {
    fontSize: 20,
    color: "#2EA7EB",
  },
  tableCell: {
    color: "rgb(68, 68, 68)",
    minWidth: 130,
  },
  table: {
    backgroundColor: "red",
  },
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
  gradeRow: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    gap: 25,
    marginBottom: 25,
    alignItems: "baseline",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#E5E4E4",
    paddingBottom: 15,
    marginTop: 20,
    color: "#444444",
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
  gradeLabel: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 30,
    lineHeight: 18,
    letterSpacing: "0.16em",
    marginTop: 30,
    marginBottom: 10,
    color: "#2EA7EB",
  },
  grade: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 70,
    lineHeight: 18,
    letterSpacing: "0.16em",
    marginTop: 30,
    marginBottom: 10,
    color: "#6B6B6B",
    fontStyle: "italic",
  },
  tableHead: {
    height: 100,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  tableText: {
    margin: 10,
  },
});
