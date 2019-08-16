const {performance} = require('perf_hooks');
/**
 * Class represents players commands stack
 * and implements methods to work with them.
 */
class CommandStack {
  /**
   * Create an instance of the CommandStack.
   * @param {CommandObject} [comObject = undefined] the command object
   */
  constructor(comObject) {
    if (comObject !== undefined) {
      this.stack = comObject.stack;
      this.lastNum = comObject.lastNum;
      this.firstNum = comObject.firstNum;
    } else {
      this.stack = [];
      this.firstNum = 0;
      this.lastNum = 0;
    }
  }

  /**
   * Adds a command to stack
   * @param {object} command An object represents a command.
   * Object signature does not really matter, it would be saved anyway.
   * @return {CommandObject}
   */
  add(command) {
    const comObject = {
      time: performance.now(),
      num: this.lastNum,
      command: command,
    };

    this.lastNum++;
    this.stack.push(comObject);
    return comObject;
  }

  /**
   * Fushes the stack
   * @return {object} command stack
   */
  flush() {
    const stack = this.stack;
    const stackObject = {
      firstNum: this.firstNum,
      lastNum: this.lastNum,
      stack: Object.assign([], stack),
    };

    this.stack = [];
    this.firstNum = this.lastNum;
    return stackObject;
  }

  /**
   * @ignore
   * @return {number}
   */
  get length() {
    return this.stack.length;
  }
}

module.exports = CommandStack;

