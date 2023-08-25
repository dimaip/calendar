if (window.NodeList && !NodeList.prototype.forEach) {
    // @ts-ignore
    NodeList.prototype.forEach = Array.prototype.forEach;
}
