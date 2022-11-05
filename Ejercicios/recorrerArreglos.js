const verduras = ["patata", "puerro", "boniato", "coliflor", "tomate"]

console.log("=============================================")
for (let index = 0; index < verduras.length; index++) {
    const element = verduras[index];
    console.log("La variable", element)
} 

console.log("=============================================")
verduras.forEach(function(verd){
    console.log("La variable", verd)
})

console.log("=============================================")
verduras.map(function(verd){
    console.log("La variable", verd)
})