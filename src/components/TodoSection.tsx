import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from "react-native";
import { TodoItem } from "../@types/TODO";
import { TodoEntryProps } from "../@types/TodoSection.props";
import CheckBox from '@react-native-community/checkbox';
import CenterModal from "./CenterModal";
import { loadLogForDay, loadLogs, storeDaily, storeToday } from "../utils/store";


const Title = ({ children }: any) => {
    return (
        <View style={styles.title}>
            <Text style={styles.whiteText}>{children}</Text>
        </View>
    )
}

const Entry = ({ item, setItem, removeItem }: TodoEntryProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <TouchableOpacity style={styles.entry}
            onLongPress={() => {
                setShowModal(true);
            }}
        >
            <Text style={styles.whiteText}>{item.title}</Text>
            <CheckBox
                boxType='square'
                style={styles.checkbox}
                value={item.isComplete}
                onValueChange={(val) => {
                    setItem({
                        ...item,
                        isComplete: val
                    });
                }}
            />
            <CenterModal
                visible={showModal}
            >
                <View>
                    <Text>Remove item?</Text>
                    <View style={styles.btnLayout}>
                        <Button title="Yes"onPress={() => {
                            removeItem();
                            setShowModal(false);
                        }}/>
                        <View style={{ marginHorizontal: 10}} />
                        <Button title="No" onPress={() => {
                            setShowModal(false);
                        }} />
                    </View>
                </View>
            </CenterModal>
        </TouchableOpacity>
    )
}

const AddButton = ({ children, addItem }: any) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [itemTitle, setItemTitle] = useState<string>('');

    return (
        <TouchableOpacity onPress={() => {
            setShowModal(true);
        }} >
            <Text style={{
                ...styles.whiteText, fontSize: 17
            }}>{children}</Text>

            <CenterModal
                visible={showModal}
            >
                <View>
                    <TextInput
                        placeholder="New Item..."
                        value={itemTitle}
                        onChangeText={setItemTitle}
                    />
                    <View style={styles.btnLayout}>
                        <Button title="Confirm" onPress={() => {
                            addItem(itemTitle);
                            setItemTitle('');
                            setShowModal(false);
                        }}/>
                        <View style={{ marginHorizontal: 10}} />
                        <Button title="Cancel" onPress={() => {
                            setItemTitle('');
                            setShowModal(false);
                        }} />
                    </View>
                </View>
            </CenterModal>
        </TouchableOpacity>
    )
}

const TodoSection = ({ d }: any) => {
    const [ daily, setDaily ] = useState<TodoItem[]>([]);

    const [ today, setToday ] = useState<TodoItem[]>([]);

    useEffect(() => {
        loadLogForDay(d).then(log => {
            setDaily(log.daily);
            setToday(log.today);
        });
        // AsyncStorage.removeItem('log');
        // AsyncStorage.removeItem('daily');
    }, [d]);

    return (
        <View>
            <Title>Daily Goal</Title>
            <View style={styles.section}>
                {
                    daily.map((e, i) => (
                        <Entry
                            key={`daily-${i}`} item={e} 
                            setItem={(item: TodoItem) => {
                                setDaily(prev => {
                                    let newTODO = [...prev];
                                    newTODO[i] = item;
                                    storeDaily(d, newTODO);
                                    return newTODO;
                                })
                            }}
                            removeItem={() => {
                                setDaily(prev => {
                                    const newTODO = prev.filter((t, j) => j !== i);
                                    storeDaily(d, newTODO);
                                    return newTODO;
                                });
                            }}
                        />
                    ))
                }
                <AddButton
                    addItem={(title: string) => {
                        setDaily(prev => {
                            const newTODO = [...prev, { title, isComplete: false }];
                            storeDaily(d, newTODO);
                            return newTODO;
                        })
                    }}
                >+ new Item</AddButton>
            </View>
            <Title>Today's Goal</Title>
            <View style={styles.section}>
                {
                    today.map((e, i) => (
                        <Entry key={`today-${i}`} item={e} setItem={(item: TodoItem) => {
                            setToday(prev => {
                                let newTODO = [...prev];
                                newTODO[i] = item;
                                storeToday(d, newTODO);
                                return newTODO;
                            })
                        }} removeItem={() => {
                            setToday(prev => {
                                const newTODO = prev.filter((t, j) => j !== i);
                                storeToday(d, newTODO);
                                return newTODO;
                            });
                        }}/>
                    ))
                }
                <AddButton
                    addItem={(title: string) => {
                        setToday(prev => {
                            const newTODO = [...prev, { title, isComplete: false }];
                            storeToday(d, newTODO);
                            return newTODO;
                        })
                    }}
                >+ new Item</AddButton>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        borderBottomColor: '#AAA',
        borderBottomWidth: 2,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    whiteText: {
        color: 'white',
        fontSize: 20
    },
    section: {
        minHeight: 250,
        paddingHorizontal: 10
    },
    entry: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkbox: {

    },
    btnLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default TodoSection;