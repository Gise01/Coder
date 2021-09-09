class Walls {
  constructor (height, width){
    this.height = parseFloat(height);
    this.width = parseFloat(width);
  }
  cover(){
    return this.height*this.width
  }
};