
abstract class PointerProcessor {
    constructor(protected source: Document) {
        this.source = source;
    }

    protected evaluateXPath(xpath: string): Node[] {
        const resolver = this.source.createNSResolver(this.source.documentElement);
        const xpathResult = this.source.evaluate(xpath, this.source, resolver);
        const nodes: Node[] = [];
    
        let node = xpathResult.iterateNext();
        while(node) {
            nodes.push(node);
            node = xpathResult.iterateNext();
        }
    
        return nodes;
    }
    
    abstract public dereference(): Node[];
}

export class PointerToIdProcessor extends PointerProcessor {
    constructor(source: Document, private id: string) {
        super(source);
    }

    public dereference(): Node[] {
        const xpath = `//*[@xml:id="${this.id}"]`;
        const idResults = this.evaluateXPath(xpath);
    
        return idResults;
    }
}

export class PointerToStringRangeProcessor extends PointerProcessor {
    private xpath: string;
    private start: number;
    private length: number;
    
    constructor(source: Document, expr: string) {
        super(source);

        const re = /$string-range\((.+),(\d+),(\d+)\)^/;
        const match = expr.match(re);

        if (!expr.startsWith('string-range('))
    }
}
/*
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
*/