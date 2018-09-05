export default class Descriptor {
  private _key: string;
  private _description: string;
  private _value: any;

  constructor (key: string, value: any, description: string) {
    this.setKey(key);
    this.setValue(value);
    this.setDescription(description);
  }

  public get key ():string {
    return this._key;
  }

  public get value ():any {
    return this._value;
  }

  public get description:string {
    return this._description;
  }

  public setKey(key:string):void {
    this._key = key;
  }

  public setValue(value: any): void {
    this._value = value;
  }

  public setDescription(description: string): void {
    this._description = description;
  }
}