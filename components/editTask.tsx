
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Switch, Button, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { editTask } from "../store/slice";

export default function EditTheTask({ route, navigation }: any) {
    const tasks = useSelector((state: RootState) => state.taskStore.tasks);
    const id = route.params.id;
    const detailsOfTheTask = tasks.filter((eachObj) => (eachObj.id == id));
    const [title, setTitle] = useState<string>(detailsOfTheTask[0].title);
    const [showTitleErrorMessage, setShowTitleErrorMessage] = useState<boolean>(false);
    const [showDescriptionErrorMessage, setDescriptionErrorMessage] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(detailsOfTheTask[0].description);
    const [showDate, setShowDate] = useState(false);
    const [selectDate, setSelectedDate] = useState(new Date(detailsOfTheTask[0].dueDate));
    const [value, setValue] = useState(detailsOfTheTask[0].status);
    const [valueErrorMsg, setValueErrorMsg] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState(false);
    const status = [
        { label: 'To-do', value: 'todo' },
        { label: 'In-progress', value: 'in-progress' },
        { label: 'Completed', value: 'Completed' },
    ];
    const dispatch = useDispatch<AppDispatch>();
    const submitTheForm = () => {
        let modifiedTask = {
            id: id,
            title: title.trim(),
            description: description.trim(),
            status: value.trim(),
            dueDate: selectDate.toDateString()

        };
        dispatch(editTask({ id: modifiedTask.id, task: modifiedTask }));
        navigation.navigate("DetailedTask",{id});
    }
    const [isrender, setIsRender]=useState<boolean>(true);
    useEffect(()=>{
        setTimeout(()=>{
            setIsRender(false)
        },500)
    })
    if(isrender){
        return <ActivityIndicator size={55} color="#054bf0" style={{flex:1,flexDirection:"column",justifyContent:"center"}} />
    }
    return (
        <SafeAreaView style={styles.edittaskContainer}>
            <Text style={styles.heading}>Edit task</Text>
            <View style={styles.card}>
                <View style={styles.content}>
                    <Text style={styles.sideHeadings}>Title:</Text>
                    <TextInput
                        placeholder="Enter the task"
                        style={styles.titletext}
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
                <View style={styles.descriptioncontent}>
                    <Text style={styles.sideHeadings}>Description:</Text>
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
                {(description.trim().length<2 && description.length != 0) && <Text style={styles.errormsg}>Minimum length of description is 2</Text>}
                {(description.trim().length>100) && <Text style={styles.errormsg}>Maximum length of description is 100</Text>}
                <Text style={styles.sideHeadings}>Status:</Text>
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
                                style={value === item.value?[styles.item,styles.selectedItem]:styles.item}
                            >
                                <Text style={value === item.value?styles.itemTextSelected:styles.itemText}>{item.label}</Text>
                            </View>
                        )}
                    />
                    {valueErrorMsg && <Text style={styles.errormsg}>*Required</Text>}
                </View>
                <View>
                    <Text style={styles.sideHeadings}>Due date</Text>
                    <TouchableOpacity onPress={() => (setShowDate((pre) => (!pre)))}>
                        <TextInput placeholder="Due date" editable={false} style={styles.datecomponent} value={selectDate.toLocaleDateString()} />
                    </TouchableOpacity>
                </View>
                <DatePicker
                    modal
                    mode="date"
                    open={showDate}
                    date={selectDate}
                    onConfirm={(date) => {
                        setSelectedDate(date)
                    }}
                    onCancel={() => (setShowDate((pre) => (!pre)))}
                />
                <View style={styles.fotterButtons}>
                    <Button title="Back" onPress={() => (navigation.navigate("DetailedTask",{id}))} />
                    <Button disabled={((title.trim() ==detailsOfTheTask[0].title || title == "")&& (description.trim()  == detailsOfTheTask[0].description || description == "") && (value.trim() == detailsOfTheTask[0].status || value=="")&&(new Date(detailsOfTheTask[0].dueDate).getDate() === selectDate.getDate())) ? true : false} title="Submit" onPress={submitTheForm} />
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
    itemTextSelected:{
        color:"white" 
    },
    itemText: {
        color: 'black',
    },
    edittaskContainer: {
        flex: 1,
        padding: 10,
        backgroundColor:"#fcf9f0"
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
        borderRadius: 5,
        
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        height: 39,
        marginTop: 10,
        width: "90%",
    },
    descriptioncontent: {
        flexDirection: "row",
        marginTop: 20,
    },
    titletext: {
        borderWidth: 1,
        width: "89%",
        height: 40,
        marginLeft: 5,
        fontSize: 15,
        borderRadius: 5,
    },
    sideHeadings: {
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
        borderRadius:5
    },
    fotterButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 25,
        borderRadius: 5,
        width: "100%",
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


