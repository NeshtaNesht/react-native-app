import React, { useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screens/screenContext";
import { AppLoader } from "../components/ui/AppLoader";

export const MainScreen = () => {
    const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);

    // Ширина контента при повороте экрана
    const width = Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
    // ДОПИСАТЬ КОММЕНТАРИИ!!!!!!!!!!!
    //const loadTodos = useCallback(async () => await fetchTodos, [fetchTodos]);
    useEffect(() => {
        // loadTodos() - не работает
        fetchTodos()
    }, []);

    if (loading) {
        return <AppLoader />;
    }

    let content = (
        <View style={{ ...width }}>
            <FlatList 
                scrollEnabled
                data={todos}
                renderItem={({item}) => <Todo id={item.id} text={item.title} onOpen={changeScreen} onLongPress={removeTodo} />}
                keyExtractor={item => item.id.toString()}  
                scrollEnabled={true}        
            />
        </View>
    )

    if (todos.length === 0) {
        content = (
        <View style={styles.imgWrap}>
            <Image style={styles.image} source={{uri: "https://www.tint.or.th/attachments/article/3187/Manual-CI.png"}} />
        </View>
        );
    }

    return (
        <View>
            <AddTodo
                onSubmit={addTodo}
            />
            {content}            
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: 100
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    }
});