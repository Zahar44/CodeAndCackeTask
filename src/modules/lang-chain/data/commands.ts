import { LangChainResponse } from "../types";

export interface Command {
    keys: string[];
    resp: LangChainResponse;
}

export const Commands: Command[] = [
    {
        keys: ['sos', 'help'],
        resp: {
            type: 'action',
            action: async () => {
                console.log('Initializing rescue protocol...');
            },
        },
    },
    {
        keys: ['hello'],
        resp: {
            type: 'text',
            text: 'Hello commander',
        },
    },
];
