export interface newTask {
    title: string;
    details: string;
    date: string;
    file?: File;
    readonly createdAt?: string;
}

export interface task extends newTask {
    fulfilled?: boolean;
    outdated?: boolean;
}