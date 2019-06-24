import { fetchXML } from "./helpers";

export class NormalizedEdition {
    public code: string = ''; // 1818, 1823, 1831, Thomas, MS
    public name: string = '';
    public chunks: string[] = [];

    constructor(obj: any) {
        this.code = obj.code;
    }

    public async fetchChunks(chunkId: string) {
        let chunk = chunkId;
        if (chunk.length === 1) {
            chunk = '0' + chunk; // '08'
        }
        const url = `https://raw.githubusercontent.com/PghFrankenstein/fv-data/master/variorum-chunks/f${this.code}_C${chunk}.xml`;
        const doc = await fetchXML(url);
        return doc;
    }
}