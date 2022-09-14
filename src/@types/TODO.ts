interface TodoItem {
    title: string,
    isComplete: boolean
}

interface Log {
    daily: TodoItem[],
    today: TodoItem[]
}

export type {
    TodoItem, Log
}