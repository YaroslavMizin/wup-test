/** типизация файла*/
interface file {
    filename: string;
    file: string;
}

/** интерфейс туду */
export interface task {
    title: string;
    details: string;
    date: number;
    files: file[];
    readonly createdAt?: string;
    fulfilled?: string;
    readonly id: string;
}