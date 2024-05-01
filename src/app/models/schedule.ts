export interface Schedule {
    id: number,
    version: number,
    serversId: number[],
    message: string,
    dateTime: Date
}
