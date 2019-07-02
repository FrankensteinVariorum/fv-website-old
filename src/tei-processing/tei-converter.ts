/* This file contains a class that takes the TEI and converts it into a React tree */

import React, { ReactNode } from 'react';
import TeiReactElement from '../tei-components/TeiReactElement';
import TeiReactText from '../tei-components/TeiReactText';
import { Chunk, Edition } from '../data/edition';
import TeiAppWrapper from '../tei-components/TeiAppWrapper';

export class TeiConverter {
    private static index = 0;
    public showVariations = false;
    public showText = false;
    public edition = undefined as Edition | undefined;

    constructor(variations?: boolean, text?: boolean, edition?: Edition) {
        if (variations)
            this.showVariations = variations;
        if (text)
            this.showText = text;
        if (edition)
            this.edition = edition;
    }

    private getHtmlTag(teiTag: string) {
        if (teiTag === 'p') {
            return 'p';
        } else if (teiTag === 'head') {
            return 'h3';
        }

        return undefined;
    }

    private buildProperties(node: Node): any {
        const nodeAttributes = (node as any).attributes;
        const valueProps: any = {};

        for (var i = 0; i < nodeAttributes.length; i++) {
            let name = nodeAttributes[i].nodeName;
            if (name === 'xml:id') {
                name = 'id';
            }
            valueProps[name] = nodeAttributes[i].nodeValue;
        }

        return valueProps;
    }

    public teiToReactElement(node: Node, chunk?: Chunk): ReactNode {  // Returns a single React element
        const reactChildren: ReactNode[] = [];
        // create elements for all children
        if (node.hasChildNodes()) {
            for (let i = 0; i < node.childNodes.length; i++) {
                const childNode = node.childNodes[i];
                let childElement: ReactNode = undefined;
                if (childNode.nodeType === 1) {
                    childElement = this.teiToReactElement(childNode, chunk);
                } else if (childNode.nodeType === 3) {
                    let text = childNode.textContent || '';
                    text = text.trim();
                    if (text) {
                        childElement = React.createElement(TeiReactText, {
                            text: childNode.textContent || '',
                            showText: this.showText,
                            showVariations: this.showVariations,
                            key: TeiConverter.index++,
                        });
                    }
                } else {
                    console.warn('Child node of unrecognizezd type: ', childNode);
                }

                if (childElement) {
                    reactChildren.push(childElement);
                }
            }
        }

        // build properties
        const valueComponent = this.buildProperties(node);

        // return create react element
        var props: any = {
            tag: node.nodeName,
            key: TeiConverter.index++,
            htmlTag: this.getHtmlTag(node.nodeName),
            showText: this.showText,
            showVariations: this.showVariations,
            teiProps: valueComponent,
            chunk
        };
        if (valueComponent.id) {
            props['id'] = valueComponent.id;
        }

        let reactElement: ReactNode = React.createElement(TeiReactElement, props, reactChildren); // Pass children

        // If node has app-ref, get app, create:
        if (props.chunk) {
            const appRef = valueComponent['app-ref'];  // This can be undefined
            const app = appRef ? props.chunk.getApp(appRef) : undefined;
            
            if (app && this.edition) {
                reactElement = React.createElement(TeiAppWrapper, {key: TeiConverter.index++,
                    showVariations: this.showVariations,
                    showText: this.showText,
                    edition: this.edition,
                    app},
                [reactElement])
            }
        }
        return reactElement;
    }
}
