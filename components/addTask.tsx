
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Switch, Button, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addTask, Task } from "../store/slice";

export default function AddTask({ navigation }: any) {
    const [title, setTitle] = useState<string>("");
    const [showTitleErrorMessage, setShowTitleErrorMessage] = useState<boolean>(false);
    const [showDescriptionErrorMessage, setDescriptionErrorMessage] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [showDate, setShowDate] = useState(false);
    const [selectDate, setSelectedDate] = useState(new Date());
    const [dateChanged, setDateChnaged] = useState<boolean>(false)
    const [value, setValue] = useState("");
    const [valueErrorMsg, setValueErrorMsg] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState(false);
    const status = [
        { label: 'todo', value: 'todo' },
        { label: 'in-progress', value: 'in-progress' },
        { label: 'Completed', value: 'Completed' },
    ];
    const tasks = useSelector((state: RootState) => state.taskStore.tasks);
    const [isrender, setIsRender] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        setTimeout(() => {
            setIsRender(false)
        }, 500)
    })
    if (isrender) {
        return <ActivityIndicator size={55} color="#054bf0" style={{ flex: 1, flexDirection: "column", justifyContent: "center" }} />
    }

    const submitTheForm = async () => {
        setDateChnaged(false);
        let lastId = tasks[tasks.length - 1].id
        const taskobj: Task = {
            id: lastId + 1,
            title: title,
            description: description,
            status: value,
            dueDate: new Date(selectDate).toDateString()
        };
        dispatch(addTask(taskobj));
        navigation.navigate("Home");
    }
    return (
        <SafeAreaView style={styles.addtaskContainer}>
            <Text style={styles.heading}>Add task</Text>
            <View style={styles.card}>
                <View style={styles.content}>
                    <Text style={styles.contentHeading}>Title:</Text>
                    <TextInput
                        placeholder="Enter the task"
                        style={styles.textStyleForTitle}
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text)
                            setShowTitleErrorMessage(text === "");

                        }}
                        onFocus={() => {
                            setShowTitleErrorMessage(title === "")
                        }}
                    />
                </View>
                {showTitleErrorMessage && <Text style={styles.errormsg}>*Required</Text>}
                <View style={styles.descriptionOfContent}>
                    <Text style={styles.contentHeading}>Description:</Text>
                    <TextInput
                        placeholder="Enter the description"
                        style={styles.descriptiontext}
                        multiline={true}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text)
                            setDescriptionErrorMessage(text === "");
                        }}
                        onFocus={() => {
                            setDescriptionErrorMessage(description === "")
                        }}
                    />
                </View>
                {showDescriptionErrorMessage && <Text style={styles.errormsg}>*Required</Text>}
                {(description.trim().length < 2 && description.length != 0) && <Text style={styles.errormsg}>Minimum length of description is 2</Text>}
                {(description.trim().length > 100) && <Text style={styles.errormsg}>Maximum length of description is 100</Text>}
                <Text style={styles.contentHeading}>Status:</Text>
                <View>
                    <Dropdown
                        style={styles.dropdown}
                        data={status}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        value={value}
                        onFocus={() => { setIsFocus(true); setValueErrorMsg(value == "") }}
                        onChange={item => {
                            setValue(item.value);
                            setValueErrorMsg(item.value == "");
                            setIsFocus(false);
                        }}
                        renderItem={(item) => (
                            <View
                                style={value === item.value ? [styles.item, styles.selectedItem] : styles.item}
                            >
                                <Text style={value === item.value ? styles.itemTextSelected : styles.itemText}>{item.label}</Text>
                            </View>
                        )}
                    />
                    {valueErrorMsg && <Text style={styles.errormsg}>*Required</Text>}
                </View>
                <Text style={styles.contentHeading}>Enter the due date</Text>
                <TouchableOpacity onPress={() => (setShowDate((pre) => (!pre)))}>
                    <TextInput placeholder="Enter the due date" editable={false} style={styles.datecomponent} value={selectDate.toDateString()} />
                </TouchableOpacity>
                <DatePicker
                    modal
                    mode="date"
                    open={showDate}
                    date={selectDate}
                    onConfirm={(date) => {
                        if (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
                            setDateChnaged(true);
                        } else {
                            setSelectedDate(date);
                            setDateChnaged(false);
                        }
                        setShowDate(false);
                    }}
                    onCancel={() => setShowDate(false)}
                />
                {(dateChanged) && (
                    <Text style={styles.errormsg}>Date should not be less than the current date</Text>
                )}

                <View style={styles.submitbutton}>
                    <Button disabled={(title && description && value && !dateChanged) ? false : true} title="Submit" onPress={submitTheForm} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 38,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    item: {
        padding: 10,
    },
    selectedItem: {
        backgroundColor: '#4287f5',
    },
    itemTextSelected: {
        color: "white"
    },
    itemText: {
        color: 'black',
    },
    addtaskContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff3f0"
    },
    heading: {
        textAlign: "center",
        fontWeight: 'bold',
        color: "black",
        fontSize: 19,
    },
    card: {
        borderWidth: 1,
        borderColor: "grey",
        marginTop: 14,
        padding: 10,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 5
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        height: 39,
        marginTop: 10,
        width: "90%",
    },
    descriptionOfContent: {
        flexDirection: "row",
        marginTop: 20,
    },
    textStyleForTitle: {
        borderWidth: 1,
        width: "89%",
        height: 40,
        marginLeft: 5,
        fontSize: 15,
        borderRadius: 5,
    },
    contentHeading: {
        fontSize: 19,
        color: "black",
        marginTop: 8
    },
    descriptiontext: {
        width: "62%",
        borderWidth: 1,
        height: 90,
        padding: 5,
        marginLeft: 5,
        fontSize: 15,
        borderRadius: 5,
        textAlignVertical: "top",
    },
    datecomponent: {
        borderWidth: 1,
        marginTop: 8,
        height: 35,
        color: "black",
        borderRadius: 5
    },
    submitbutton: {
        marginTop: 25,
        borderRadius: 5,
        width: 150,
        textAlign: "center",
        alignSelf: "center",
        marginBottom: 25,
    },
    errormsg: {
        fontSize: 16,
        color: 'red'
    },
    // dropdown: {
    //     height: 38,
    //     borderWidth: 1
    // }
});

