import React, { ReactNode } from 'react';
import TeiElement from '../tei-components/TeiElement';

interface ReactCompInfo {
        tag: string;
        props: string[];
}

interface ReactValueCompInfo {
        tag: string;
        valueProps: [];
}

export class TeiConverter {
        private static _comps : Map<string, ReactCompInfo>;
        private static teiElement = TeiElement;
        private static index = 0;

        constructor() {
                TeiConverter._comps = new Map<string, ReactCompInfo>();
                TeiConverter.fillComps();
        }

        private static fillComps() {
                const componentsClass: any = {
                        'body': {tag: 'body', props: []} as ReactCompInfo,
                        'div': {tag: 'div', props: ['type']} as ReactCompInfo,
                        'app': {tag: 'app', props: ['id']} as ReactCompInfo,
                        'rdgGrp': {tag: 'rdgGrp', props: ['id', 'n']} as ReactCompInfo,
                        'rdg': {tag: 'rdg', props: ['wit']} as ReactCompInfo,
                        'seg': {tag: 'seg', props: ['id', 'part']} as ReactCompInfo,
                        'ab': {tag: 'ab', props: ['type']} as ReactCompInfo,
                        'p': {tag: 'p', props: ['id']} as ReactCompInfo,
                        'pb': {tag: 'pb', props: ['n', 'id']} as ReactCompInfo,
                        'hi': {tag: 'hi', props: ['id']} as ReactCompInfo,
                        'head': {tag: 'head', props: ['id']} as ReactCompInfo,
                        'milestone': {tag: 'milestone', props: ['n', 'type', 'unit']} as ReactCompInfo,
                };

                for (let key in componentsClass) {
                        TeiConverter._comps.set(key, componentsClass[key]);
                }
        }

        private getComp(tag: string): ReactCompInfo | undefined {
                if (!TeiConverter._comps.has(tag)) {
                    console.error(`Can't find component for ${tag}.`);
                    return undefined;
                }
        
                return TeiConverter._comps.get(tag)!;
        }

        private buildProperties(node: Node, compInfo: ReactCompInfo): ReactValueCompInfo {
                const nodeAttributes = (node as any).attributes;
        
                var valueProps = compInfo.props.map((prop) => {
                        var xmlProp = prop;
                        if (prop === 'id') {
                                xmlProp = 'xml:id';
                        }
                        if (!nodeAttributes[xmlProp]) {
                                console.error(`There is no property '${xmlProp}' in '${node.nodeName}' node.`);
                                return {};
                        }       
                        const val = nodeAttributes[xmlProp].nodeValue;
                        return {[prop]: val};
                });

                return {
                        tag: compInfo.tag,
                        valueProps
                } as ReactValueCompInfo;
        }

        public teiToReactElement(node: Node, depth: number): ReactNode {  // Returns a single React element
                const reactChildren: ReactNode[] = [];
                // create elements for all children
                if (node.hasChildNodes()) {
                        // TODO: add texts (no new line text)
                        const children = Array.from(node.childNodes).filter(c => c.nodeType === 1); // (no 3- #text node, new line ?)

                        for (let i = 0; i < children.length; i++) {
                                const child = this.teiToReactElement(children[i], depth + 1);
                                reactChildren.push(child);
                        }
                }

                // find reactCompInfo
                let compInfo: ReactCompInfo | undefined;
                compInfo = this.getComp(node.nodeName);
                
                if (compInfo) {
                        // build properties
                        const valueComponent = this.buildProperties(node, compInfo);

                        // return create react element
                        var props: any = {
                                tag: valueComponent.tag,
                                key: TeiConverter.index++,
                                x_depth: depth
                        };
                        
                        for (var a of Object.values(valueComponent.valueProps)) {
                                for (let key in (a as any)) {
                                        props[key] = a[key];
                                }
                        }                        
                        const reactElement = React.createElement(TeiConverter.teiElement, props, reactChildren); // Pass children

                        return reactElement;
                }
                // else {
                //         props = {
                //                 tag: 'empty_tag',
                //                 key: 9999,
                //         };
                //         return React.createElement(TeiConverter.teiElement, props)
                // }
        }
}
