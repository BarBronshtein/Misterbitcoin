export class Contact {
  static index = 100;
  constructor(
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public _id?: string
  ) {}

  setId?(id: string = 'u' + ++Contact.index) {
    // Implement your own set Id
    this._id = id;
  }

  // *_makeId=()=>{
  //   this.index++;
  //    while (true) {
  //     yield 'u'+(this.index+Math.random().toFixed(4));
  //    }
  // }
}
