import FvStore from "./store";
import { evaluateXPath } from "../tei-processing/helpers";

export class Annotation {
    public readonly editionCode: string;
    public readonly chunkNumber: number;
    private _json: Object | undefined;
    private _initialized = false;
    private _initializationPromise?: Promise<void>;
    
    constructor(edition: string, chunk: number) {
        this.editionCode = edition;
        this.chunkNumber = chunk;
    }

    public initialize(): Promise<void> {
        // Initialize may be called several times before the first initialization complete.
        // We make sure initialization runs only once
        if(this._initializationPromise) {
            return this._initializationPromise;
        }

        this._initializationPromise = this.innerInitialize();
        this._initializationPromise.then(() => {
            this._initializationPromise = undefined;
        })
        return this._initializationPromise;
    }

    private async innerInitialize() {
        if(this._initialized) {
            return;
        }

        this._json = await this.getJSON();

        await this.parsePointers();
        
        this._initialized = true;
    }

    private async getJSON() {
        const url = `https://raw.githubusercontent.com/FrankensteinVariorum/fv-data/master/hypothesis/openannotation/${this.editionCode}_xml_id_mapping.json`

        const document = await FvStore.jcache.getJSON(url);

        return document;
    }
    
    private async parsePointers() {
        let ptrs = []
        const chunkStr = this.chunkNumber < 10 ? `0${this.chunkNumber}` : `${this.chunkNumber}`;
        const xml = await FvStore.cache.getXML(`https://raw.githubusercontent.com/PghFrankenstein/fv-data/master/variorum-chunks/f${this.editionCode}_C${chunkStr}.xml`)

        ptrs = this._json!["json"].map((annotation: Object) => this.parsePointer(annotation, xml))

        return ptrs;
    }

    private parsePointer(annotation: Object, xml: Document) {
        const xpath = annotation["target"]["selector"][1]["startSelector"]["value"]
        const target = evaluateXPath(xml, xpath)
        if (target.length > 0) {
            const el = <Element><any>target[0]
            el.setAttribute("annotatedBy", annotation["id"])
        }
        return xpath
    }

    public getAnnotation(id: string) {
        const annotation = this._json!["json"].filter((a: Object) => a['id'] === id)[0]        
        return annotation
    }
   
}
