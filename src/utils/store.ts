import AsyncStorage from "@react-native-async-storage/async-storage";
import { Log, TodoItem } from "../@types/TODO";


async function storeDaily(day: string, daily: TodoItem[]) {
    await AsyncStorage.setItem('daily', JSON.stringify(daily));

    const log = await loadLogs();
    const thisDay = await loadLogForDay(day);
    await AsyncStorage.setItem('log', JSON.stringify({
        ...log,
        [day]: {
            ...thisDay,
            daily
        }
    }));
}

async function storeToday(day: string, today: TodoItem[]) {
    const log = await loadLogs();
    const thisDay = await loadLogForDay(day);
    await AsyncStorage.setItem('log', JSON.stringify({
        ...log,
        [day]: {
            ...thisDay,
            today
        }
    }));
}

async function loadLogs(): Promise<{[day: string]: Log}> {
    const prev = await AsyncStorage.getItem('log');
    if(prev) {
        return JSON.parse(prev);
    }
    else {
        return {};
    }
}

async function loadDaily(): Promise<TodoItem[]> {
    let goals = await AsyncStorage.getItem('daily');
    if(goals) {
        return JSON.parse(goals);
    }
    else {
        return [];
    }
}

async function loadLogForDay(day: string): Promise<Log> {
    const template = await loadDaily();
    const daily = template.map(item => {
        return {
            ...item,
            isComplete: false
        }
    });

    const prev = await loadLogs();

    if(prev[day]){ 
        return prev[day];
    }
    else {
        return {
            daily,
            today: []
        };
    }
}

export {
    storeDaily, storeToday, loadLogs, loadDaily, loadLogForDay
}