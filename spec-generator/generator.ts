/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as fs from 'fs';
import {IProtocol, Protocol as P} from './json_schema';

class OutlineNode {

	private children: OutlineNode[] = [];
	public readonly anchor: string;

	constructor(
		parent: OutlineNode,
		private title: string
	 ) {
		if (parent) {
			 parent.children.push(this);
			 let a = title;
			 if (parent.anchor) {
				 a = `${parent.anchor}_${title}`;
			 }
			 this.anchor = a.replace(/ /g, '_');
		}
	}

	dump(level = 0): string {
		let outline = '';
		const indent = '  '.repeat(level);
		outline += `${indent}- title: ${this.title}\n`;
		if (this.anchor) {
			outline += `${indent}  anchor: ${this.anchor}\n`;
		}
		if (this.children.length > 0) {
			this.children = this.children.sort((a, b) => a.title.localeCompare(b.title));
			outline += `${indent}  children:\n`;
			for (let c of this.children) {
				outline += c.dump(level+1);
			}
		}
		return outline;
	}
}

//---- Markdown ------------------------------------------------------------------------------------

function MarkDown(schema: IProtocol): string {

	let s = '';

	s += '---\n';
	s += 'title: Specification\n';
	s += 'layout: specification\n';
	s += 'sectionid: specification\n';
	s += 'toc: true\n';
	s += '---\n\n';

	s += '<!--- Auto-generated from json schema. Do not edit! -->\n\n';

	s += Header(1, schema.title);
	s += description(schema);

	s += 'The change history of the specification can be found [here](./changelog).';

	for (let typeName in schema.definitions) {

		const d2 = schema.definitions[typeName];

		let supertype: string = null;
		if ((<P.AllOf>d2).allOf) {
			const array = (<P.AllOf>d2).allOf;
			for (let d of array) {
				if ((<P.RefType>d).$ref) {
					supertype = getRef((<P.RefType>d).$ref);
				} else {
					s+= Type(typeName, <P.Definition> d, supertype);
				}
			}
		} else {
			s+= Type(typeName, <P.Definition | P.StringType> d2);
		}
	}

	s += line();

	return s;
}

let lastRequestType = '';

function Type(typeName: string, definition: P.Definition | P.StringType, supertype?: string): string {

	let heading = typeName;
	let shortHeading = typeName;

	const properties = (<P.ObjectType>definition).properties;
	if (properties) {
		if (properties.event && properties.event['enum']) {
			const eventName = `${properties.event['enum'][0]}`;
			shortHeading = eventName;
			heading = `:arrow_left: ${camelCase(eventName)} Event`;
		} else if (properties.command && properties.command['enum']) {
			const requestName = `${properties.command['enum'][0]}`;
			shortHeading = requestName;
			const arrow = requestName === 'runInTerminal' ? ':arrow_right_hook:' : ':leftwards_arrow_with_hook:';
			heading = `${arrow} ${camelCase(requestName)} Request`;
			lastRequestType = typeName.replace('Request', '');
		}
	}

	let s = line();

	if (definition['title']) {
		s += Header(2, definition['title']);
	}

	if (lastRequestType.length > 0 && typeName.startsWith(lastRequestType) && typeName !== `${lastRequestType}Request`) {
		// this definition belongs to the previous request: don't add header but add an anchor so that we can link to it
		s += description(definition);
		s += `<a name="Types_${shortHeading}" class="anchor"></a>\n`;
	} else {
		s += Header(3, heading, shortHeading);
		s += description(definition);
	}

	s += '```typescript\n';

	if ((<P.StringType>definition).enum) {
		s += Enum(typeName, <P.StringType> definition);
	} else {
		s += Interface(typeName, <P.Definition> definition, supertype);
	}

	s += '```\n';

	return s;
}

let outline, outline2: OutlineNode;

function Header(level: number, text: string, short?: string): string {

	const label = short ? camelCase(short) : text;

	let node: OutlineNode;
	if (!outline) {
		node= outline = new OutlineNode(null, label);
	} else if (level === 2) {
		node= outline2= new OutlineNode(outline, label);
	} else if (level === 3) {
		node= new OutlineNode(outline2, label);
	}

	let anchor = node.anchor ? `<a name="${node.anchor}" class="anchor"></a>` : '';
	return `${'#'.repeat(level)} ${anchor}${text}\n\n`;
}

function description(c: P.Commentable): string {

	if (c.description) {
		return c.description.replace(/\n/g, '\n\n').replace(/\n\n- /g, '\n- ') + '\n\n';
	}
	return '';
}

function camelCase(s: string) {
	return s[0].toUpperCase() + s.substr(1);
}

//---- TypeScript ------------------------------------------------------------------------------------

let numIndents = 0;

function Interface(interfaceName: string, definition: P.Definition, superType?: string): string {

	let x = `interface ${interfaceName}`;
	if (superType) {
		x += ` extends ${superType}`;
	}
	let s = openBlock(x);

	let i = 0;
	for (let propName in definition.properties) {
		if (i++ > 0) {
			s += '\n';
		}
		const required = definition.required ? definition.required.indexOf(propName) >= 0 : false;
		s += property(propName, !required, definition.properties[propName]);
	}

	s += closeBlock();

	return s;
}

function Enum(typeName: string, definition: P.StringType): string {
	const x = enumAsOrType(definition.enum);
	return line(`type ${typeName} = ${x};`);
}

function enumAsOrType(enm: string[]) {
	return enm.map(v => `'${v}'`).join(' | ');
}

function comment(c: P.Commentable): string {

	let description = c.description || '';

	// array
	if ((<any>c).items) {
		c = (<any>c).items;
	}

	// a 'closed' enum with individual descriptions
	if (c.enum && c.enumDescriptions) {
		for (let i = 0; i < c.enum.length; i++) {
			description += `\n'${c.enum[i]}': ${c.enumDescriptions[i]}`;
		}
	}

	// an 'open' enum
	if (c._enum) {
		description += '\nValues: ';
		if (c.enumDescriptions) {
			for (let i = 0; i < c._enum.length; i++) {
				description += `\n'${c._enum[i]}': ${c.enumDescriptions[i]}`;
			}
			description += '\netc.';
		} else {
			description += `${c._enum.map(v => `'${v}'`).join(', ')}, etc.`;
		}
	}

	if (description) {
		if (numIndents === 0) {
			// in markdown
			description = description.replace(/\n/g, '\n');
			return description + '\n';
		} else {
			// in code
			description = description.replace(/<code>(.*)<\/code>/g, "'$1'");
			const ind = indent();
			return `${ind}/**\n${ind} * ` + description.replace(/\n/g, `\n${ind} * `) + `\n${ind} */\n`;
		}
	}
	return '';
}

function openBlock(str: string, openChar?: string, indent?: boolean): string {
	indent = typeof indent === 'boolean' ?  indent : true;
	openChar = openChar || ' {';
	let s = line(`${str}${openChar}`, true, indent);
	numIndents++;
	return s;
}

function closeBlock(closeChar?: string, newline?: boolean): string {
	newline = typeof newline === 'boolean' ? newline : true;
	closeChar = closeChar || '}';
	numIndents--;
	return line(closeChar, newline);
}

function propertyType(prop: any): string {
	if (prop.$ref) {
		return getRef(prop.$ref);
	}
	switch (prop.type) {
		case 'array':
			const s = propertyType(prop.items);
			if (s.indexOf(' ') >= 0) {
				return `(${s})[]`;
			}
			return `${s}[]`;
		case 'object':
			return objectType(prop);
		case 'string':
			if (prop.enum) {
				return enumAsOrType(prop.enum);
			}
			return `string`;
		case 'integer':
			return 'number';
	}
	if (Array.isArray(prop.type)) {
		if (prop.type.length === 7 && prop.type.sort().join() === 'array,boolean,integer,null,number,object,string') {	// silly way to detect all possible json schema types
			return 'any';
		} else {
			return prop.type.map(v => v === 'integer' ? 'number' : v).join(' | ');
		}
	}
	return prop.type;
}

function objectType(prop: any): string {
	if (prop.properties) {
		let s = openBlock('', '{', false);

		let i = 0;
		for (let propName in prop.properties) {
			if (i++ > 0) {
				s += '\n';
			}
			const required = prop.required ? prop.required.indexOf(propName) >= 0 : false;
			s += property(propName, !required, prop.properties[propName]);
		}

		s += closeBlock('}', false);
		return s;
	}
	if (prop.additionalProperties) {
		return `{ [key: string]: ${orType(prop.additionalProperties.type)}; }`;
	}
	return '{}';
}

function orType(enm: string | string[]): string {
	if (typeof enm === 'string') {
		return enm;
	}
	return enm.join(' | ');
}

function property(name: string, optional: boolean, prop: P.PropertyType): string {
	let s = '';
	s += comment(prop);
	const type = propertyType(prop);
	const propertyDef = `${name}${optional ? '?' : ''}: ${type}`;
	if (type[0] === '\'' && type[type.length-1] === '\'' && type.indexOf('|') < 0) {
		//s += line(`// ${propertyDef};`);
		s += line(`${propertyDef};`);
	} else {
		s += line(`${propertyDef};`);
	}
	return s;
}

function getRef(ref: string): string {
	const REXP = /#\/(.+)\/(.+)/;
	const matches = REXP.exec(ref);
	if (matches && matches.length === 3) {
		return matches[2];
	}
	console.log('error: ref');
	return ref;
}

function indent(): string {
	return '  '.repeat(numIndents);
}

function line(str?: string, newline?: boolean, indnt?: boolean): string {
	newline = typeof newline === 'boolean' ? newline : true;
	indnt = typeof indnt === 'boolean' ? indnt : true;
	let s = '';
	if (str) {
		if (indnt) {
			s += indent();
		}
		s += str;
	}
	if (newline) {
		s += '\n';
	}
	return s;
}

/// Main

const debugProtocolSchema = JSON.parse(fs.readFileSync('./debugAdapterProtocol.json').toString());

fs.writeFileSync(`specification.md`, MarkDown(debugProtocolSchema), { encoding: 'utf-8'});

fs.writeFileSync(`_data/specification-toc.yml`, outline.dump(), { encoding: 'utf-8'});
