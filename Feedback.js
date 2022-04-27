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
    this.state = {};
  }

  render() {
    return (
      // create s stack navigator to contain the first 3 components of the app
      <View style={styles.body}>
        <Text style={styles.title}>AUTOMATED ESSAY MARKING SYSTEM</Text>
        <View style={styles.container}>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>GRADE: </Text>
            <Text style={styles.grade}>5.6/10</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subtitle}>OVERVIEW OF THE ESSAY</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.table}>
              <Text>1</Text>
              <Text>1</Text>
              <Text>1</Text>
              <Text>1</Text>
            </View>
          </View>
          {/* <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
          <Rows data={state.DataTable} textStyle={styles.TableText}/> */}
        </View>
      </View>
    );
  }
}

export default FeedbackScreen;

const styles = StyleSheet.create({
  table: {
    backgroundColor: "red",
  },
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
  gradeRow: {
    flexDirection: "row",
    // minWidth: 600,
    // justifyContent: "space-between",
    // marginTop: 40,
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
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: "#444444",
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
  gradeLabel: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 30,
    lineHeight: 18,
    letterSpacing: "0.16em",
    marginTop: 30,
    marginBottom: 10,
    // color: "#444444",
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
    // color: "#444444",
    color: "#6B6B6B",
    fontStyle: "italic",
    // textShadow: "0px 4px 4px rgba(0, 178, 255, 0.32)",
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
