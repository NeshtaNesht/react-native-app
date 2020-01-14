import React from "react";
import { View, StyleSheet, Text, Platform, TouchableHighlightComponent } from "react-native";
import { AppTextBold } from "../components/ui/AppTextBold";
import { THEME } from "../theme";

export const Navbar = (props) => {
    return (
        <View style = {{...styles.navbar, ...Platform.select({
            ios: styles.navbarIos,
            android: styles.navbarAndroid
        })}}>
            <AppTextBold style={styles.text}>{props.title}</AppTextBold>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "flex-end",        
        paddingBottom: 10        
    },
    navbarAndroid: {
        backgroundColor: THEME.MAIN_BACKGROUD
    },
    navbarIos: {
        borderBottomColor: THEME.MAIN_BACKGROUD,
        borderBottomWidth: 1
    },
    text: {
        color: Platform.OS === "ios" ? THEME.MAIN_BACKGROUD : "#fff",
        fontSize: 20
    }
});