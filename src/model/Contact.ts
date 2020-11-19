import { genId } from "./Utils";

export class Contact {
  constructor(
    public id: string = genId(),
    public name: string = "",
    public phone: string = ""
  ) {}
}
