export class App {
    public readonly id: string;
    public readonly n: number | undefined;
    public readonly element: Element;
    private _derefrencedElement: Element | undefined;

    constructor(element: Element) {
        this.element = element;

        const idAttr = element.attributes.getNamedItemNS('xml', 'id')
        if (!idAttr) {
            throw new Error('<app> tag with no xml:id');
        }
        this.id = idAttr.value;

        const nAttr = element.attributes.getNamedItem('n');
        this.n = nAttr ? parseInt(nAttr.value) : undefined;
    }

    public get dereferencedElement() {
        if(!this._derefrencedElement) {
            throw new Error('Dereferenced element not initialized');
        }
        return this._derefrencedElement;
    }

    public async dereference() {
        this._derefrencedElement = this.element.cloneNode(true) as Element;
        
    }
}

export class Spine {
    public readonly chunkNumber: number;
    private _xml: Document;
    private _dereferencedXml: Document;
    
    constructor(chunk: number) {
        this.chunkNumber = number;
    }

    public async initialize() {
        this._xml = await this.getXML();
        this._dereferencedXml = await this.getXML();  // Works instantly due to the cache, just requires reparsing

    }

    public async getXML() {
        const chunkStr = this.chunkNumber < 10 ? `0${this.chunkNumber}` : `${this.chunkNumber}`;
        const url = `https://raw.githubusercontent.com/PghFrankenstein/fv-data/master/standoff_Spine/spine_C${chunkStr}.xml`

        return await FvStore.cache.getXML(url);
    }
}
