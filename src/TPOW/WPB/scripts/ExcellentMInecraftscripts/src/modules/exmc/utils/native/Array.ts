interface Array<T> {
    clear(): void;
}

Array.prototype.clear = function () {
    this.splice(0, this.length);
}