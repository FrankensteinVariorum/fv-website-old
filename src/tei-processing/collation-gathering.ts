import { fetchXML, parseXML, evaluateXPath } from "./helpers";

interface Pointer {
    node: ChildNode,
    url: string,
    xpath: string,
}

export class CollationGathering {
    private _collationDoc: Document;
    private  _xmls : Map<string, Document>;  // Map from URL to a parsed XML

    constructor(tei: Document) {
        this._collationDoc = tei;
        this._xmls = new Map<string, Document>();
    }

    public get collation() {
        return this._collationDoc;
    }
    
    private async loadXML(url: string) {
        const doc = await fetchXML(url);
        this._xmls.set(url, doc);
    }

    private getXML(url: string): Document {
        if (!this._xmls.has(url)) {
            throw new Error(`Can't find the XML for ${url}. Did you forget to fetch it?`);
        }

        return this._xmls.get(url)!; // The ! means we are cetain 'undefined' will not be returned
    }

    private parsePointer(ptr: Element): Pointer {
        const attr = ptr.attributes.getNamedItem('target');
        if (!attr) {
            throw new Error(`ptr ${ptr} has no target attribute`);
        }
        const target = attr.value;

        const parts = target.split('#')
        if (parts.length !== 2) {
            throw new Error(`Target ${target} is not well formatted. Expected uri#xpath`);
        }

        return {
            node: ptr as ChildNode,
            url: parts[0],
            xpath: parts[1]
        };
    }

    public async dereferencePointers() {
        const ptrElements = Array.from(this._collationDoc.getElementsByTagName('ptr'));
        const pointers = ptrElements.map((ptr) => this.parsePointer(ptr));

        // First, fetch all URLs
        const urlSet = new Set(pointers.map((ptr) => ptr.url));
        const urls = Array.from(urlSet);
        const promises = urls.map((url) => this.loadXML(url));
        await Promise.all(promises);

        // Now we can dereference all the pointers
        for(const ptr of pointers) {
            const replacements = this.dereferencePointer(ptr);
            if (replacements.length === 0) {
                ptr.node.remove();
            } else {
                const car = replacements[0];
                
                ptr.node.replaceWith(car);
                
                const cdr = replacements.slice(1);  // Homage to LISP
                cdr.reverse();
                for(const node of cdr) {
                    ptr.node.after(node);
                }
            }
        }
    }

    private dereferencePointer(ptr: Pointer): Node[] {
        const dom = this.getXML(ptr.url);

        // Most paths we have are actually just element IDs. Build an xpath expression for them:
        const xpath = `//*[@xml:id="${ptr.xpath}"]`;
        const idResults = evaluateXPath(dom, xpath);

        if (idResults.length) { 
            return idResults;
        }

        const xpathResults = evaluateXPath(dom, ptr.xpath);
        console.debug(`XPath search ${ptr.xpath}: ${xpathResults}`);

        if(xpathResults.length) {
            return xpathResults;
        }

        console.error(`Can't resolve pointer ${ptr.xpath}`);
        return [];
    }
}

export async function collateFromURL(url: string): Promise<CollationGathering> {
    const doc = await fetchXML(url);
    return new CollationGathering(doc);
}

export function collateFromElement(id: string): CollationGathering {
    const elem = document.getElementById(id);
    if (!elem) {
        throw new Error(`Can't find element with id ${id}`);
    }

    const xml = elem.innerHTML;
    const doc = parseXML(xml);
    return new CollationGathering(doc);
}