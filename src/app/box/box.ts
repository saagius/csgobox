export type BoxConnection = {
	edges: [BoxEdge]
	total: number
}

export type BoxEdge = {
	node: Box
}

export type Box = {
	id: string;
	name: string;
	iconUrl: string;
	cost: number;
}

export type OpenBoxInput = {
	boxId: string;
	amount: number;
}

export type BoxQuery = {
	box: Box
};

export type BoxesQuery = {
	boxes: BoxConnection
};
