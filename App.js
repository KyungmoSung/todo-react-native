import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import Todo from "./Todo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedTodos: false
  };
  componentDidMount() {
    this.loadTodos();
  }

  render() {
    const { newToDo, loadedTodos } = this.state;
    if (!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>TODO</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this.controlNewToDo}
            placeholderTextColor={"#ccc"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this.addTodo}
          />
          <ScrollView contentContainerStyle={styles.todo}>
            <Todo text={"todo title"} />
          </ScrollView>
        </View>
      </View>
    );
  }
  controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  loadTodos = () => {
    this.setState({
      loadedTodos: true
    });
  };
  addTodo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObj = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObj
          }
        };
        return { ...newState };
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 40,
    fontWeight: "300",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -2,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    fontSize: 20
  },
  todo: {
    alignItems: "center"
  }
});
