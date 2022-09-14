import { TodoItem } from "./TODO";

interface TodoEntryProps {
    item: TodoItem,
    setItem: (item: TodoItem) => void,
    removeItem: () => void
}

export type {
    TodoEntryProps
}