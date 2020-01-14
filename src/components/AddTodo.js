import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, Keyboard } from "react-native";
import { THEME } from "../theme";
import { AntDesign } from "@expo/vector-icons";

export const AddTodo = (props) => {

    const [value, setValue] = useState("");

    const pressHandler = () => {
        if (value.trim()) {
            props.onSubmit(value);
            setValue("");
            Keyboard.dismiss();
        }
        else {
            Alert.alert("Внимание", "Введите название дела");
        }        
    }

    return (
        <View style={styles.block}>
            <TextInput             
                style={styles.input}
                onChangeText={setValue}            
                value={value}
                placeholder="Введите название дела..."
                autoCorrect = {false}
                autoCapitalize="none"
            />
            <AntDesign.Button                
                onPress = {pressHandler}
                name = "pluscircleo"
            >
                Добавить
            </AntDesign.Button>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    input: {
        width: "60%",
        padding: 10,
        fontSize: 16,
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_BACKGROUD
    },
    button: {

    }
});