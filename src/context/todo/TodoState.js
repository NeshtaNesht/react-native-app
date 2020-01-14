import React, {useReducer, useContext} from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screens/screenContext";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actionTypes";

export const TodoState = ({ children }) => {
    const initialState = { // Начальный стейт компонента
        todos: [
            {id : "1", title: "Устроиться в Kari"}
        ]
    };

    const {changeScreen} = useContext(ScreenContext)

    // Создание редюсера
    // useReducer(какой редюсер юзаем, т.е. todoReducer, initialState - начальное состояние)
    const [state, dispatch] = useReducer(todoReducer, initialState);

    // ф-ия addTodo, которую мы диспатчим. С помощью dispatch заявляем, что мы собираемся менять state
    // В dispatch передаем type и объект
    const addTodo = (title) => dispatch({type: ADD_TODO, title});

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
        Alert.alert(
            "Удаление элемента", 
            `Вы уверены, что хотите удалить "${todo.title}"`,
            [
                {
                text: "Отмена", style: "cancel"
                },
                {
                text: "Удалить",
                onPress: () => {
                    changeScreen(null);
                    dispatch({type: REMOVE_TODO, id});
                }
                }
            ],
            {
                cancelable: false
            }
            );         
    }

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

    // Возвращаем контекст, объявленный как провайдер. В value передаем используемый функционал
    // После чего в TodoState обернем все другие компоненты (childrens)

    return <TodoContext.Provider value={{todos: state.todos, addTodo, removeTodo, updateTodo}}>{children}</TodoContext.Provider>
}