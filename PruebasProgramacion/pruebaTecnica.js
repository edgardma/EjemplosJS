//import assert from 'node:assert/strict'
// Fuente: https://www.youtube.com/watch?v=xkXtqa8kjFY
const directory = [
  {"name": "Maggie", "age": 14, "id": 0, "phone": "+123456"},
  {"name": "Joseph", "age": 24, "id": 1, "phone": "+145454"},
  {"name": "Margaret", "age": 11, "id": 2, "phone": "+125556"},
  {"name": "Elizabeth", "age": 61, "id": 3, "phone": "+765756"},
  {"name": "Julio", "age": 24, "id": 4, "phone": "+165756"},
  {"name": "Kevin", "age": 64, "id": 5, "phone": "+888886"},
  {"name": "Martin", "age": 71, "id": 6, "phone": "+12323456"},
  {"name": "Aaron", "age": 30, "id": 7, "phone": "+12434343"}
]

const registrartions = [
  {"name": "Maggie", "age": 14, "id": 0, "email": "maggie@notreal.com", "confirmed": true},
  {"name": "Elizabeth", "age": 61, "id": 1, "email": "elizabeth@notreal.com", "confirmed": false},
  {"name": "Martin", "age": 71, "id": 2, "email": "martin@notreal.com", "confirmed": false},
  {"name": "Aaron", "age": 30, "id": 3, "email": "aaron@notreal.com", "confirmed": true}
]

// write a function perform a join
// parameters: { leftArray: Array<object>, rightArray: Array<object>, key: string}

// performance is nice.

const a = [
  {id: 0, name: 'Miguel'},
  {id: 1, name: 'Justin'}
]

const b = [
  {id: 0, email: 'miguel@gmail.com'},
  {id: 2, email: 'alpha@gmail.com'}
]

const expectedOutput = [
  { id: 0, name: 'Miguel', email: 'miguel@gmail.com'}
]



function innerJoin({ leftArray, rightArray, key }) {
  const map = new Map()
  leftArray.forEach(item => map.set(item[key], item))
  
  let join = []
  rightArray.forEach(rightItem => {
    const leftItem = map.get(rightItem[key])
    if (leftItem === undefined) return
    
    join.push({ ... leftItem, ... rightItem})
  })
  
  return join
}

console.log(
innerJoin({ leftArray: directory, rightArray: registrartions, key: 'name'}))

/*
assert.deepStrictEqual(
  innerJoin({ leftArray: a, rightArray: b, key: 'id'}),
  expectedOutput
)*/