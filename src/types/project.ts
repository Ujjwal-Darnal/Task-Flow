export interface Project {
    readonly id: number;
    name: string;
    description:string;
    status:'Active'|'Completed'|'Archived';
    createdAt:string;
    taskCount:number;
}

