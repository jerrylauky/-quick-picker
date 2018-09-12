import lang from "lodash/lang";
import Validator from "./validator";

export function cloneDeep (value: object | any[]): object | any[] {
  return lang.cloneDeep(value);
}

export function getType (value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export function isMap (value: any): boolean {
  return lang.isMap(value);
}

export function isObject (value: any): boolean {
  return lang.isPlainObject(value);
}

export function mapToObjectDeep (map: Map<{}, {}>): object {
  Validator.notNull(map, "Map");

  let obj: object = Object.create(null);
  let isAMap: boolean = isMap(map);
  let keys: string[] | IterableIterator<{}> = isAMap ? map.keys() : Object.keys(map);
  let numberOfKeys: number = isAMap ? map.size : keys.length;

  for (let i: number = 0; i < numberOfKeys; i++) {
    let key: string = isAMap ? keys.next().value : keys[i];
    let val: any = isAMap ? map.get(key) : map[key];
    if (isMap(val) || isObject(val)) {
      obj[key] = mapToObjectDeep(val);
    } else {
      obj[key] = val;
    }
  }

  return obj;
}

// export function printObject(object: Lottery) {
//   if (
//     !object.toDescriptorList ||
//     typeof object.toDescriptorList !== "function"
//   ) {
//     throw new Error("Given object is not printable.");
//   }

//   let descriptorList = object.toDescriptorList();
//   return (
//     <table>
//       <tbody>
//         {descriptorList.map((descriptor: Descriptor) => (
//           <tr>
//             <td>{descriptor.description}: </td>
//             <td> {descriptor.value} </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
