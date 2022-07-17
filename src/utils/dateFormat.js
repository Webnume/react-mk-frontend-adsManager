export const date = (dateToFormat)=>{
    
// fournir le jour de la semaine avec une date longue
let options = { year: "numeric", month: "long", day: "numeric"};
return (new Date(dateToFormat).toLocaleDateString("fr-FR", options));
// → "Thursday, December 20, 2012, UTC"
}