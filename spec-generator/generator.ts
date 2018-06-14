/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as fs from 'fs';
import {IProtocol, Protocol as P} from './json_schema';

let numIndents = 0;
let section = 'Types';
let lastRequestType = '';

let outline = '';

let anchor = 1;

function Header(level: number, text: string): string {

	anchor++;

	const t = text.replace(/:.+: /, '');

	const indent = '  '.repeat(level-1);
	outline += `${indent}- title: ${t}\n`;
	outline += `${indent}  anchor: ${String(anchor)}\n`;
	outline += `${indent}  children:\n`;

	return `${'#'.repeat(level)} <a name="${String(anchor)}" class="anchor"></a>${text}\n`;
}

function Module(moduleName: string, schema: IProtocol): string {

	let s = '';

	s += '---\n';
	s += 'title: Specification\n';
	s += 'layout: specification\n';
	s += 'sectionid: specification\n';
	s += 'toc: true\n';
	s += '---\n';
	//s += comment({ description : 'Auto-generated from json schema. Do not edit manually!'});
	s += '\n';
	s += Header(1, 'Debug Adapter Protocol Specification');
	s += '\n';

	s += Header(2, 'Base Protocol');

	s += '\n';

	for (let typeName in schema.definitions) {

		const d2 = schema.definitions[typeName];

		let supertype: string = null;
		if ((<P.AllOf>d2).allOf) {
			const array = (<P.AllOf>d2).allOf;
			for (let d of array) {
				if ((<P.RefType>d).$ref) {
					supertype = getRef((<P.RefType>d).$ref);
				} else {
					s += Interface(typeName, <P.Definition> d, supertype);
				}
			}
		} else {
			if ((<P.StringType>d2).enum) {
				s += Enum(typeName, <P.StringType> d2);
			} else {
				s += Interface(typeName, <P.Definition> d2);
			}
		}
	}

	s += line();

	return s;
}

function Interface(interfaceName: string, definition: P.Definition, superType?: string): string {

	let header = `${interfaceName}`;
	let type = 'Types';

	if (definition.properties && definition.properties.event && definition.properties.event['enum']) {
		const eventName = `${definition.properties.event['enum'][0]}`;
		header = `:arrow_left: ${camelCase(eventName)} Notification`;
		type = 'Events';
	} else if (definition.properties && definition.properties.command && definition.properties.command['enum']) {
		const requestName = `${definition.properties.command['enum'][0]}`;
		const arrow = requestName === 'runInTerminal' ? ':arrow_right_hook:' : ':leftwards_arrow_with_hook:';
		header = `${arrow} ${camelCase(requestName)} Request`;
		type = 'Requests';
		lastRequestType = interfaceName.replace('Request', '');
	}

	let s = line();

	if (lastRequestType.length > 0 && interfaceName.startsWith(lastRequestType) && interfaceName !== `${lastRequestType}Request`) {
		// skip header
	} else {

		if (section !== type) {
			section = type;
			s += Header(2, `${section}`);
		}

		s += Header(3, `${header}`);
	}

	s += comment({ description : definition.description });

	s += '\n```typescript\n';

	let x = `interface ${interfaceName}`;
	if (superType) {
		x += ` extends ${superType}`;
	}
	s += openBlock(x);

	for (let propName in definition.properties) {
		const required = definition.required ? definition.required.indexOf(propName) >= 0 : false;
		s += property(propName, !required, definition.properties[propName]);
	}

	s += closeBlock();

	s += '```\n';

	return s;
}

function Enum(typeName: string, definition: P.StringType): string {
	let s = line();
	s += comment(definition);
	const x = enumAsOrType(definition.enum);
	s += line(`export type ${typeName} = ${x};`);
	return s;
}

function enumAsOrType(enm: string[]) {
	return enm.map(v => `'${v}'`).join(' | ');
}

function comment(c: P.Commentable): string {

	let description = c.description || '';

	if ((<any>c).items) {	// array
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
		description = description.replace(/<code>(.*)<\/code>/g, "'$1'");
		numIndents++;
		description = description.replace(/\n/g, '\n' + indent());
		numIndents--;

		if (numIndents === 0) {
			return description + '\n';
		} else {
			if (description.indexOf('\n') >= 0) {
				return line(`/** ${description}\n${indent()}*/`);
			} else {
				return line(`/** ${description} */`);
			}
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

		for (let propName in prop.properties) {
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

function camelCase(s: string) {
	return s[0].toUpperCase() + s.substr(1);
}

/// Main

const debugProtocolSchema = JSON.parse(fs.readFileSync('./debugProtocol.json').toString());

const emitStr = Module('DebugProtocol', debugProtocolSchema);

fs.writeFileSync(`specification.md`, emitStr, { encoding: 'utf-8'});

fs.writeFileSync(`_data/specification-toc.yml`, outline, { encoding: 'utf-8'});

