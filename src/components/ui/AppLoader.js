import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { THEME } from "../../theme";

// Компонент, описывающий лоадер. Показывается, когда данные еще не загрузились
export const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color={THEME.MAIN_BACKGROUD} />
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
