import FvStore from "./store";

export class Edition {
    public code: string = ''; // 1818, 1823, 1831, Thomas, MS
    public name: string = '';
    public chunks: number[] = [];

    constructor(code: string, name: string, chunks: number[]) {
        this.code = code;
        this.name = name;
        this.chunks = chunks;
    }

    protected getChunkUrl(chunkId: number) {
        const chunkStr = chunkId < 10 ? `0${chunkId}` : `${chunkId}`;
        const url = `https://raw.githubusercontent.com/PghFrankenstein/fv-data/master/variorum-chunks/f${this.code}_C${chunkStr}.xml`;

        return url;
    }

    public async getChunk(chunkId: number) {
        return await FvStore.cache.getXML(this.getChunkUrl(chunkId));
    }
}
