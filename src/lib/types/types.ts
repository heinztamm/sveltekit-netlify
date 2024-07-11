export interface User {
	id: number;
	name: string;
    auditRatio: number;
}

export interface Object {
    name: string;
}
export interface Project {
    object: Object;
    amount: number;
}

export interface Result {
    user: User | null;
    auditRatio: number;
	auditSumUp: number;
	auditSumDown: number;
    totalXP: number;
    XP_Transfers: Project[];
}
