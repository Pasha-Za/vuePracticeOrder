export default function searchObjProp (nameKey, prop, myArray){
  for (var i=0; i < myArray.length; i++) {
    if (myArray[i][prop] === nameKey) {
      return {
        data: myArray[i],
        index: i
      };
    }
  }
}
