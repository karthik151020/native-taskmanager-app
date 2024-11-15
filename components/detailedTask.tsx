
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { deleteTask } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";



export default function DetailedTaskDescription({ route, navigation }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const id= route.params.id;
    let tasks = useSelector((state: RootState) => state.taskStore.tasks);
    tasks = tasks.filter((obj)=>(obj.id==id));
    const [isrender, setIsRender]=useState<boolean>(true);
    useEffect(()=>{
        setTimeout(()=>{
            setIsRender(false)
        },500)
    })
    if(isrender){
        return <ActivityIndicator size={55}  color="#054bf0" style={{flex:1,flexDirection:"column",justifyContent:"center"}} />
    }
    function deleteTheTask(id: number) {
        dispatch(deleteTask(id));
        navigation.navigate('Home');
    }
    return (
        <SafeAreaView style={styles.detailedContainer}>
            <Text style={styles.heading}>Detailed description of the card</Text>
            <View style={styles.card}>
                <View style={styles.content}>
                    <Text style={styles.sideHeading}>Title :</Text>
                    <Text style={styles.description}>{tasks[0].title}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.sideHeading}>Description :</Text>
                    <Text style={styles.description}>{tasks[0].description}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.sideHeading}>Due date :</Text>
                    <Text style={styles.description}>{new Date(tasks[0].dueDate).toLocaleDateString()}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.sideHeading}>Status :</Text>
                    <Text style={styles.description}>{tasks[0].status}</Text>
                </View>
                <View style={styles.navBottom}>
                    <View style={styles.editButton}><Button title="Edit" onPress={() => (navigation.navigate("EditTask", {
                        id: tasks[0].id
                    }))} /></View>
                    <View style={styles.deleteButton}><Button title="Delete" onPress={() => (deleteTheTask(route.params.id))} color={"red"} /></View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    detailedContainer: {
        padding: 10,
        flex: 1,
        backgroundColor:"#f8fff0"
    },
    card: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        // borderColor: "grey",
        borderRadius: 7,
        margin: 8,
        marginTop: 40,
        padding: 10,
        // height: 310,
        width: "95%",
        backgroundColor: "white",
        borderColor: "white",
        shadowColor:"black",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:15,
        shadowRadius:4,
        elevation:5

    },
    sideHeading: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#202121"
    },
    content: {
        paddingTop: 7,
        paddingBottom: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: 'wrap'
    },
    description: {
        fontSize: 16,
        color: "#202121"
    },
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        color: "black"
    },
    navBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 15
    },
    editButton: {
        width: 110
    },
    deleteButton: {
        width: 110
    }
})

