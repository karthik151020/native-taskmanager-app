
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Modal, Alert, Image, ActivityIndicator } from "react-native";
import { Task } from "../types";
import { useTaskFilter } from "../customHooks";
import DatePicker from 'react-native-date-picker';
const date = new Date();
export default function ListOfTasks({ navigation }: any) {
    const [status, setStatus] = useState<string[]>([]);
    const [showFromDate, setShowFromDate] = useState(false);
    const [showToDate, setShowToDate] = useState(false);
    const [fromDate, setFromDate] = useState<any>("");
    const [toDate, setToDate] = useState<any>("");
    const [toDateTriggred, setToDateTriggred] = useState(false);
    const [fromDateTriggred, setFromDateTriggred] = useState(false);
    const [inputtext, setText] = useState<string>("");
    const [toDateError, setToDateError] = useState<boolean>(false);
    const [fromDateError, setFromDateError] = useState<boolean>(false)
    const tasks = useTaskFilter(inputtext, fromDate, toDate, status, toDateTriggred, fromDateTriggred);
    const [modalVisible, setModalVisible] = useState(false);
    const [listofTasks, setListOfTasks] = useState<Task[]>(tasks);
    const [isrender, setIsRender] = useState<boolean>(false);
    const [clickedCompleted, setClickedCompleted] = useState<boolean>(false);
    const [clickedInprogress, setClickedInprogress] = useState<boolean>(false);
    const [clickedTodo, setClickedTodo] = useState<boolean>(false);
    useEffect(() => {
        setIsRender(false);
        setTimeout(() => {
            setIsRender(true)
            setListOfTasks(tasks);
        }, 300)
    }, [tasks]);

    const clearFilter = () => {
        setText("");
        setStatus([]);
        setFromDate("");
        setToDate("");
        setToDateTriggred(false);
        setFromDateTriggred(false);
        setFromDateError(false);
        setToDateError(false);
        setClickedCompleted(false);
        setClickedInprogress(false);
        setClickedTodo(false);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.topNav}>
                    <Text style={styles.heading}>Tasks</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Add task" onPress={() => navigation.navigate("AddTask")} />
                    </View>
                </View>
                <View style={styles.filters}>
                    <TextInput
                        value={inputtext}
                        onChangeText={setText}
                        placeholder="Search by Title"
                        style={styles.inputtext}
                    />
                    <Button title="more filters" onPress={() => setModalVisible(true)}>
                    </Button>
                    <TouchableOpacity style={styles.clearfilter}>
                        {/* <Text style={styles.clearFilterButton}>Clear</Text> */}
                        <Button title="clear" onPress={clearFilter} disabled={(inputtext == "" && toDate =="" && fromDate=="" && status.length==0)?true:false}></Button>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.popupscreen}>
                            <TouchableOpacity style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }} onPress={() => setModalVisible(!modalVisible)}>
                                <Image source={{
                                    uri: "https://t3.ftcdn.net/jpg/00/69/37/26/360_F_69372697_LSptpUKLbHwJSeCdBZ2uINqCQkg34oBF.jpg"
                                }} style={{ height: 25, width: 20 }}></Image>
                            </TouchableOpacity>
                            <Text style={styles.popupHeading}>Filters</Text>
                            <Text style={styles.filterByDateHeading}>Filter by dates:</Text>
                            <View style={styles.alignDates}>
                                <View>
                                    <Text style={styles.date}>From date </Text>
                                    <View style={styles.alignImgaeTextBox}>
                                        <TextInput value={fromDate == "" ? fromDate.toString() : fromDate.toLocaleDateString()} editable={false} style={{ color: "black",width:90  }}></TextInput>
                                        <TouchableOpacity onPress={() => (setShowFromDate((pre) => (!pre)))}>
                                            <Image source={
                                                {
                                                    uri: "https://img.freepik.com/free-vector/schedule-calendar-flat-style_78370-1550.jpg?t=st=1730697973~exp=1730701573~hmac=2db4a525048881f1b757813805da334f3f2a6ca632b00a521088848fbfd5e8e8&w=740"
                                                }
                                            }
                                                style={styles.image}></Image>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={showFromDate}
                                            date={date}
                                            onConfirm={(date) => {
                                                if (date > toDate && toDate != "") {
                                                    return setFromDateError(true);
                                                }
                                                else {
                                                    setFromDate(date);
                                                    setFromDateTriggred(true);
                                                    setShowFromDate((pre) => (!pre));
                                                    setFromDateError(false)
                                                }
                                            }}
                                            onCancel={() => (setShowFromDate((pre) => (!pre)))}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.date}>To date</Text>
                                    <View style={styles.alignImgaeTextBox}>
                                        <TextInput value={toDate == "" ? toDate.toString() : toDate.toLocaleDateString()} editable={false} style={{ color: "black",width:90 }}></TextInput>
                                        <TouchableOpacity onPress={() => (setShowToDate((pre) => (!pre)))}>
                                            <Image source={
                                                {
                                                    uri: "https://img.freepik.com/free-vector/schedule-calendar-flat-style_78370-1550.jpg?t=st=1730697973~exp=1730701573~hmac=2db4a525048881f1b757813805da334f3f2a6ca632b00a521088848fbfd5e8e8&w=740"
                                                }
                                            }
                                                style={styles.image}></Image>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={showToDate}
                                            date={date}
                                            onConfirm={(date) => {
                                                if (date < fromDate && fromDate != "") {
                                                    return setToDateError(true)
                                                }
                                                else {
                                                    setToDate(date);
                                                    setToDateTriggred(true);
                                                    setShowToDate((pre) => (!pre));
                                                    setToDateError(false);
                                                }
                                            }}

                                            onCancel={() => (setShowToDate((pre) => (!pre)))}
                                        />
                                    </View>
                                </View>
                            </View>
                            {toDateError && <Text style={styles.errormsg}>To date should not be less than from date</Text>}
                            {fromDateError && <Text style={styles.errormsg}>From date should not be greater than to date</Text>}
                            <Text style={styles.filterByDateHeading}>Status:</Text>
                            <View style={styles.radio}>
                                <TouchableOpacity onPress={() => {
                                    const current = !clickedTodo
                                    setClickedTodo((pre) => (!pre));
                                    if (current) {
                                        setStatus((pre) => ([...pre, "todo"]))
                                    }
                                    else {
                                        const filtered = status.filter((arr) => (arr != "todo"));
                                        setStatus(filtered);
                                    }
                                }}>
                                    <View style={styles.alignradio}>
                                        <View style={styles.checkbox}>
                                            {clickedTodo && <View style={styles.checkboxColor}></View>}
                                        </View>
                                        <Text style={styles.radiotext}>Todo</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    const current = !clickedInprogress
                                    setClickedInprogress((pre) => (!pre));
                                    if (current) {
                                        setStatus((pre) => ([...pre, "in-progress"]));
                                    }
                                    else {
                                        const filtered = status.filter((arr) => (arr != "in-progress"))
                                        setStatus(filtered);
                                    }
                                }}>
                                    <View style={styles.alignradio}>
                                        <View style={styles.checkbox}>
                                            {clickedInprogress && <View style={styles.checkboxColor}></View>}
                                        </View>
                                        <Text style={styles.radiotext}>In-progress</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    const current = !clickedCompleted;
                                    setClickedCompleted((pre) => (!pre))
                                    if (current) {
                                        setStatus((pre) => ([...pre, "Completed"]))
                                    }
                                    else {
                                        const filtered = status.filter((arr) => (arr != "Completed"))
                                        setStatus(filtered);
                                    }
                                }}>
                                    <View style={styles.alignradio}>
                                        <View style={styles.checkbox}>
                                            {clickedCompleted && <View style={styles.checkboxColor}></View>}
                                        </View>
                                        <Text style={styles.radiotext}>Completed</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.clearfilter, styles.clearbutton]} onPress={clearFilter}>
                                {/* <Text style={styles.clearFilterButton}>Clear</Text> */}
                                <Button title="clear" onPress={clearFilter} disabled={(inputtext == "" && toDate =="" && fromDate=="" && status.length==0)?true:false}></Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    {isrender ? listofTasks.length > 0 ? (
                        listofTasks.map((eachObj: Task) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("DetailedTask", {
                                        id: eachObj.id
                                    })
                                }
                                style={styles.card}
                                key={eachObj.id}
                            >
                                <View style={styles.content}>
                                    <Text style={styles.sideHeading}>Title: </Text>
                                    <Text style={styles.description}>{eachObj.title}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.sideHeading}>Description: </Text>
                                    <Text style={styles.description}>{eachObj.description}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.sideHeading}>Due date: </Text>
                                    <Text style={styles.description}>
                                        {new Date(eachObj.dueDate).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.sideHeading}>Status: </Text>
                                    <Text style={styles.description}>{eachObj.status}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.headingForNoTasks}>No task is there to display</Text>
                    ) : <ActivityIndicator size={55} color="#054bf0" style={{ flex: 1, flexDirection: "column", justifyContent: "center", marginTop: 250 }} />
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    errormsg: {
        fontSize: 15,
        color: "red"
    },
    clearbutton: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15
    },
    date: {
        color: "black",
        fontSize: 16
    },
    alignImgaeTextBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    alignDates: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    alignDateFilter: {
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        // marginLeft: 1,
        width: 25,
        height: 25,
    },
    filterByDateHeading: {
        textAlign: "left",
        fontSize: 18,
        color: "black",
        marginBottom: 5,
        marginTop: 5
    },
    radio: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    radiotext: {
        fontSize: 19,
        marginLeft: 8,
        color: "black"
    },
    checkboxColor: {
        backgroundColor: "#024ded",
        height: 16,
        borderRadius: 100,
        width: 16
    },
    alignradio: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5
    },
    checkbox: {
        height: 22,
        width: 22,
        borderRadius: 100,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    showfilters: {
        backgroundColor: "blue",
        padding: 5,
        height: 38,
        borderRadius: 4,
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor:"#fcf9f0"
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },
    topNav: {
        flexDirection: "row",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "right",
        paddingRight: 48,
        color: "#202121",
        width: "70%",
        textDecorationLine: 'underline'
    },
    buttonContainer: {
        alignItems: "center",
        width: "39%",
    },
    filters: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 10,
    },
    inputtext: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
        padding: 8,
        borderRadius: 5,
        fontSize: 17,
        width: "45%",
        marginRight: 10,
        height: 36
    },
    dropdown: {
        height: 38,
        borderWidth: 1,
        width: "85%",
        padding: 4,
        borderRadius: 5,
    },
    clearfilter: {
        marginLeft: 11,
        alignItems: "flex-end"
    },
    clearFilterButton: {
        backgroundColor: "#007bff",
        color: "white",
        fontSize: 17,
        borderRadius: 4,
        padding: 7,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popupscreen: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "flex-start",
    },
    popupHeading: {
        alignSelf: "center",
        fontSize: 20,
        marginBottom: 7,
        fontWeight: "bold",
        color: "black"
    },
    popupSideHeading: {
        color: "black",
        fontSize: 18,
        marginBottom: 10
    },
    card: {
        flexDirection: "column",
        borderWidth: 1,
        borderRadius: 7,
        margin: 8,
        padding: 10,
        width: "95%",
        backgroundColor: "white",
        borderColor: "white",
        shadowColor:"black",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5,

    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        color: "#202121",
    },
    sideHeading: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#202121",
    },
    description: {
        fontSize: 17,
        color: "#202121",
    },
    headingForNoTasks: {
        marginTop: 30,
        fontSize: 23,
        textAlign: "center",
        fontWeight: "bold"
    },
});
