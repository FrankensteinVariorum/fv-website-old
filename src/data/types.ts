import FvStore from "./store";

export class Edition {
    public readonly code: string = ''; // 1818, 1823, 1831, Thomas, MS
    public readonly name: string = '';
    public readonly chunks: number[] = [];

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

    public async getXML(chunkId: number) {
        return await FvStore.cache.getXML(this.getChunkUrl(chunkId));
    }
}

export class Chunk {
    public readonly edition: Edition;
    public readonly chunkNumber: number;
    public readonly tei: Document;
    public readonly spine: Spine;

    private constructor(edition: Edition, chunkNumber: number, tei: Document, spine: Document) {
        this.edition = edition;
        this.chunkNumber = chunkNumber;
        this.tei = tei;
        this.spine = spine;
    }

    public static async load(edition: Edition, chunkNumber: number) {
        const document = await edition.getXML();
        const spine = await FvStore.getSpine(chunkNumber);
    }
}
