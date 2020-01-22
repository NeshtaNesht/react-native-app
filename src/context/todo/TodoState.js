import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screens/screenContext";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from "../actionTypes";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    // Начальный стейт компонента
    todos: [],
    loading: false,
    error: null
  };

  const { changeScreen } = useContext(ScreenContext);

  // Создание редюсера
  // useReducer(какой редюсер юзаем, т.е. todoReducer, initialState - начальное состояние)
  // dispatch - метод для изменения стейта
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // ф-ия addTodo, которую мы диспатчим. С помощью dispatch заявляем, что мы собираемся менять state
  // В dispatch передаем type и объект
  const addTodo = async title => {
    const data = await Http.post(
      "https://learningapp-7e4bf.firebaseio.com/todos.json",
      { title }
    );
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}"`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://learningapp-7e4bf.firebaseio.com/todos/${id}.json`
            );
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      {
        cancelable: false
      }
    );
  };

  const fetchTodos = async () => {
    // Показываем лоадер и чистим ошибки
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://learningapp-7e4bf.firebaseio.com/todos.json"
      );
      const todos = Object.keys(data).map(key => ({
        ...data[key],
        id: key
      }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Опаньки...");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  // метод PATCH для изменения не всего объекта
  // PUT для изменения всего объекта
  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://learningapp-7e4bf.firebaseio.com/todos/${id}.json`,
        {
          title
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError("Опаньки...");
      console.log(e);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  // Возвращаем контекст, объявленный как провайдер. В value передаем используемый функционал
  // После чего в TodoState обернем все другие компоненты (childrens)

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        loading: state.loading,
        error: state.error
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
