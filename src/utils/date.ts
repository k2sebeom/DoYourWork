function addDay(date: string, days: number): string {
    const d = new Date(date);
    const day = d.getDate();
    d.setDate(day + days);
    return d.toDateString();
}

export {
    addDay
}