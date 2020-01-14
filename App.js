import React, { useState } from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState} from "./src/context/screens/ScreenState";

// Асинхронная ф-ия загрузки шрифтов
async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf")
  });
}

/**
 * Мобильное приложение для взаимодействия преподавателей и студентов
 * Рассчитана на ВУЗы
 * При регистрации пользователь выбирает кто он: преподаватель или студент
 * Выбрав учебное заведение, студент может просматривать расписание пар, ДЗ список преподавателей
 * Преподаватель может отвечать на вопросы студентов, давать ДЗ на выбранную пару
 * Необходимо предусмотреть возможность интеграции с Google ClassRoom, например, для получения списка курсов
 * Google Classroom API https://developers.google.com/classroom/reference/rest/v1/courses
 * React Native https://facebook.github.io/react-native/docs/components-and-apis
 * Vladilen Minin https://clck.ru/LhpK9 
 */


export default function App() {
  const [isReady, setIsReady] = useState(false); 
  // Используем компонент AppLoading из expo.
  // Сверху создали состояние загрузки приложения. По умолчанию оно false
  // Если в AppLoading сработало событие onFinish, то меняем состояние на true
  // Потом рисуем приложение
  if (!isReady) {
    return (<AppLoading startAsync={loadApplication} onError={err => console.log(err)} onFinish={() => setIsReady(true)} />)
  }    

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>    
  );
}

