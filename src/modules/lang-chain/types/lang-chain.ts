export type LangChainResponse = LangChainAction | LangChainText;

export interface LangChainAction {
    type: 'action';
    action: () => Promise<unknown>;
}

export interface LangChainText {
    type: 'text';
    text: string;
}
