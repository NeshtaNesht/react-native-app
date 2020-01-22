import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screens/ScreenState";

// Асинхронная ф-ия загрузки шрифтов
async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf")
  });
}

/**
 * Тестовое мобильное приложение
 * React Native https://facebook.github.io/react-native/docs/components-and-apis
 */

export default function App() {
  const [isReady, setIsReady] = useState(false);
  // Используем компонент AppLoading из expo.
  // Сверху создали состояние загрузки приложения. По умолчанию оно false
  // Если в AppLoading сработало событие onFinish, то меняем состояние на true
  // Потом рисуем приложение
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
