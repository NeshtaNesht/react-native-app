import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { THEME } from "../theme";
import { AppText } from "../components/ui/AppText";

export const Todo = (props) => (
    <TouchableOpacity 
        onPress={() => props.onOpen(props.id)}
        onLongPress={() => props.onLongPress(props.id)}
    >
        <View style={styles.todo}>
            <AppText>
                {props.text}
            </AppText>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderWidth: 1,
        borderColor: THEME.MAIN_BACKGROUD,
        borderRadius: 5,
        marginBottom: 10
    }
});