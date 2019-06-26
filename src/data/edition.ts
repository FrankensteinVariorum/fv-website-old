import FvStore from "./store";
import { Spine } from "./spine";

export abstract class Edition {
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

    public abstract getRootElement(document: Document): Element;
}

export class EditionWithBody extends Edition {
    public getRootElement(document: Document): Element {
        try {
            return document.getElementsByTagName('body')[0];
        } catch(err) {
            console.error(`Can't located body element of ${this.code}: ${err}`);
            throw new Error("Can't locate body element");
        }
    }
} 

export class MSEdition extends EditionWithBody { }  // TODO: Add our own getRootElementW

export class Chunk {
    public readonly edition: Edition;
    public readonly chunkNumber: number;
    public readonly tei: Document;
    public readonly root: Element;
    public readonly variations: Spine;

    private constructor(edition: Edition, chunkNumber: number, tei: Document, spine: Spine) {
        this.edition = edition;
        this.chunkNumber = chunkNumber;
        this.tei = tei;
        this.variations = spine;
        this.root = edition.getRootElement(tei);
    }

    public static async load(edition: Edition, chunkNumber: number): Promise<Chunk> {
        const document = await edition.getXML(chunkNumber);
        const spine = await FvStore.getSpine(chunkNumber);
        await spine.initialize();

        const chunk = new Chunk(edition, chunkNumber, document, spine);
        chunk.addAppReferences();

        return chunk;
    }

    public getApp(appRef: string) {
        const app = this.variations.apps.find((a) => a.id === appRef);
        if(!app) {
            throw new Error(`Can't locate app ${appRef}`);
        }
        return app;
    }

    private addAppReferences() {
    }
}
