// import { cloneDeep } from "../libs/index";
// /**
// * Created with a set of keys. Each object stored in the map must have those keys. 
// * Guarantees uniqueness of each object by ensuring the sequence of keys when 
// * hashing object values. Maps each object to a single value.
// */
// export default class ObjectMap {
 
//   /*
//   * Ctor. 
//   * @param keys {Array} an array of unique keys, which will always be mapped to 
//   *     the same JSON String. Any object used as a key of this map must have 
//   *     only and all of these properties.
//   */
//   constructor(keys: string[]) {
//     this.keys = cloneDeep(keys);
//     this.map = {};
//     this.keyMap = {};
//   }

//   /**
//   * Returns true or false if the object is in the map. 
//   * 
//   * @param object {Object} the object to check. 
//   * @return boolean true or false if in the map. 
//   */
//   hasKey(object: object): boolean {
//     return this.map.hasOwnProperty(this._getKey(object));
//   }
 
//   /**
//   * Returns the array of values stored under that object in the map. 
//   * Undefined if the object is not in the map. 
//   * 
//   * @param object {Object} the object to retrieve a value for.  
//   * @return {Array{Object}} and array of values for what was stored under that key.
//   */
//   getValue(object: object): number | string | object | any[] {
//     return this.map[this._getKey(object)]
//   }
 
//   /**
//   * Puts the value in the map with the object as the key. 
//   * 
//   * @param object {Object} the object to be used as a key in the map. 
//   * @return {Object} the value stored for that key.
//   */
//   setValue (object: object, value: number | string | object | any[]): void {
//     let key = this._getKey(object);
//     this.map[key] = value;
//     this.keyMap[key] = object;
//   }

//   /**
//   * Returns a collection with the key objects and value objects.
//   *
//   * @return an array of objects with properties:
//   *     key: The object used as the key in the map
//   *     value: The value stored for that key. 
//   */
//   toCollection (): object[] {
//     return Object.keys(this.map).map((objectKey) => {
//       return { key: this.keyMap[objectKey], value: this.map[objectKey] };
//     }); 
//   }
 
//   // An internal method to guarantee each object has the expected keys. 
//   _getKey (object: object): string {
//     let objectsKeys = Object.keys(object);
//     if (objectsKeys.length !== this.keys.length) {
//       throw new TypeError(`Object inserted into map: ${object} does not have required keys of ${this.keys} !`);
//     }
 
//     let values = [];
//     for (let index = 0; index < this.keys.length; index++) {
//       let key = this.keys[index];
//       if (!object.hasOwnProperty(key)) {
//         throw new TypeError(`Object ${object} does not have key: ${key} in required set of keys: ${this.keys} !`);
//       }
//       values.push(object[key]);
//     }
//     return JSON.stringify(values);
//   }
// }