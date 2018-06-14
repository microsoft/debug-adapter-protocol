/**
 * TypeScript definitions for a subset of the json schema.
 */

export interface IProtocol {

	$schema: string,
	title: string,
	description: string,
	type: "object",

	definitions: { [key: string]: Protocol.Definition2 }
}

export module Protocol {

	export interface Definition extends ObjectType {
	}

	export interface AllOf {
		allOf: (Definition | RefType ) []
	}

	export type Definition2 = Definition | AllOf | StringType;
	type PropertyType = PrimitiveType | StringType | ObjectType | ArrayType;

	export interface PrimitiveType extends BaseType {
		type: "number" | "integer" | "boolean"
	}

	export interface Commentable {
		/** Description of the type */
		description?: string
		/** Possible values of a string. */
		enum?: string[]
		/** Possible descriptions for the values of a string. */
		enumDescriptions?: string[]
		/** Possible values of a string. */
		_enum?: string[]
	}

	export interface StringType extends BaseType, Commentable {
		type: "string"
		/** Possible values of a string. */
		enum?: string[]
		/** Possible descriptions for the values of a string. */
		enumDescriptions?: string[]
		/** Possible values of a string. */
		_enum?: string[]
	}

	export interface ObjectType extends BaseType {
		type: "object"
		/** Properties of the type. Maps to a typed object */
		properties?: { [key: string]: PropertyType; }
		/** Names of required properties */
		required?: string[],
		/** Are additional properties allowed? */
		additionalProperties?: boolean
	}

	export interface ArrayType extends BaseType {
		type: "array"
		/** Maps to a typed array e.g string[] */
		items: RefType | PrimitiveType | StringType | ObjectType
		/** Cardinality of length of array type */
		//minItems?: number
		//maxItems?: number
	}

	export interface RefType {
		/** Reference to a domain defined type */
		$ref: string
	}

	export interface BaseType {
		/** Description of the type */
		description?: string
	}
}