
const context = [];



const useState = (initialValue) => ({
    _subscribers: new Set(),
    _value: initialValue,
    get: function () {
      const current = context.at(-1);
      if (current) {
        this._subscribers.add(current);
      }
      return this._value;
    },
    set: function (value) {
      if (this._value === value) {
        return;
      }
      this._value = value;
      this._subscribers.forEach((sub) => sub());
    },
  });


  
  export default useState