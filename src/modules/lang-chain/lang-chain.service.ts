import { NoActionException } from "src/errors";
import { Command, Commands } from "./data";
import { LangChainResponse } from "./types";

export class LangChainService {
    public async getActionFromText(text: string): Promise<LangChainResponse> {
        const resp = this.getActionFromLocalStorage(text);
        if (!resp) throw NoActionException;

        return resp;
    }

    private getActionFromLocalStorage(text: string) {
        const words = text.split(' ');
        let bestMatchWeight = 0;
        let bestMatch: LangChainResponse; 

        for (const command of Commands) {
            let weight = this.getWeight(words, command);
            if (weight <= bestMatchWeight) continue;

            bestMatch = command.resp;
            bestMatchWeight = weight;
        }

        return bestMatch;
    }

    private getWeight(words: string[], command: Command) {
        let weight = 0;
        for (const word of words) {
            if (command.keys.some((k) => k === word)) {
                weight++;
            }
        }
        return weight;
    }
}
