import FvStore from "./store";
import { Edition } from "./types";

interface PointerData {
    element: Element;
    groupId: string;
    edition: Edition;
    // pointer: PointerProcessor;
}

export class Apparatus {  // Content of the <app> tag
    public readonly id: string;
    public readonly n: number | undefined;
    public readonly element: Element;

    public readonly pointers: PointerData[];

    constructor(element: Element) {
        this.element = element;

        const idAttr = element.attributes.getNamedItem('xml:id')
        if (!idAttr) {
            throw new Error('<app> tag with no xml:id');
        }
        this.id = idAttr.value;

        const nAttr = element.attributes.getNamedItem('n');
        this.n = nAttr ? parseInt(nAttr.value) : undefined;

        this.pointers = this.parsePointers();

        console.log(`Created Apparatus id ${this.id}, n ${this.n}, ${this.pointers.length} pointers`);
    }

    private parsePointers() {
        const ptrElements = Array.from(this.element.getElementsByTagName('ptr'));
        const ptrs = ptrElements.map((el) => this.parsePointer(el));

        return ptrs;
    }

    private parsePointer(ptrElement: Element) {
        const rdgElement = ptrElement.parentNode as Element;
        if (!rdgElement || rdgElement.tagName !== 'rdg') {
            throw new Error(`Parent of <ptr> is not <rdg>`);
        }
        const witAttr = rdgElement.attributes.getNamedItem('wit');
        if (!witAttr) {
            throw new Error('<rdg> element does not have a wit attribute');
        }
        const editionCode = witAttr.value.substr(2);  // with is #f1818, #fMS etc...
        let edition: Edition;
        try {
            edition = FvStore.getEdition(editionCode);
        } catch(err) {
            throw new Error(`<rdg> has invalid witness ${witAttr.value}`);
        }

        const rdgGroupElement = rdgElement.parentNode as Element;
        if(!rdgGroupElement || rdgGroupElement.tagName !== 'rdgGrp') {
            throw new Error(`Parent of <rdg> element is not <rdgGrp>`);
        }
        const grpIdAttr = rdgGroupElement.attributes.getNamedItem('xml:id');
        if (!grpIdAttr) {
            throw new Error('<rdrGrp> has no xml:id');
        }
        const groupId = grpIdAttr.value;

        return {
            element: ptrElement,
            edition,
            groupId
        };
    }
}


export class Spine {
    public readonly chunkNumber: number;
    private _apps: Apparatus[] | undefined;
    private _xml: Document | undefined;
    private _initialized = false;
    
    constructor(chunk: number) {
        this.chunkNumber = chunk;
    }

    public async initialize() {
        if (this._initialized) {
            return;
        }

        this._xml = await this.getXML();
        await this.parseApps();
        this._initialized = true;
    }

    private async getXML() {
        const chunkStr = this.chunkNumber < 10 ? `0${this.chunkNumber}` : `${this.chunkNumber}`;
        const url = `https://raw.githubusercontent.com/PghFrankenstein/fv-data/master/standoff_Spine/spine_C${chunkStr}.xml`

        return await FvStore.cache.getXML(url);
    }

    private async parseApps() {
        if(!this._xml) {
            throw new Error('parseApps called before getXML, which makes no sense')
        }

        const appElements = Array.from(this._xml.getElementsByTagName('app'));
        const apps = appElements.map((app) => new Apparatus(app));
        this._apps = apps;
    }

    public get apps(): Apparatus[] {
        if (!this._apps) {
            throw new Error(`Spine not initialized yet`);
        }
        return this.apps;
    }
}
