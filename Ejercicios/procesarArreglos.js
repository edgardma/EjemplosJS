const verduras = ["patata", "puerro", "boniato", "coliflor", "tomate"]

console.log("=============================================")
const preciosFor = []
for (let index = 0; index < verduras.length; index++) {
    const element = verduras[index];
    const precio = 2 * element.length
    preciosFor.push(precio)
} 
console.log("Te va a costar", preciosFor)

console.log("=============================================")
const preciosForEach = []
verduras.forEach(function(verd){
    const precio = 2 * verd.length
    preciosForEach.push(precio)
})
console.log("Te va a costar", preciosForEach)

console.log("=============================================")
const preciosMap = verduras.map(function(verd){
    return 2 * verd.length
})
console.log("Te va a costar", preciosMap)