export interface User {
	id : number;
	name : string;
	projectIdList : number[];
	projects : Project[];
}

export interface Project {
	id? : number;
	name : string;
	ownerId : number;
	taskIdList : number[];
	tasks : Task[];
}

export interface Task {
	id? : number;
	name : string;
	projectId : number;
	cardIdList : number[];
	cards : Card[];
}

export interface Card {
	id? : number;
	name : string;
	taskId : number;
}