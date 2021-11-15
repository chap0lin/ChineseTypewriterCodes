const stringData = `0,0024	0,0085	0,0004	0,0002	0,0019	0,0001	0,0002	0,0003	0,0004	0,0007	0,0003	0,001	0,0003	0,001	0,0003	0,001	0,0014	0,0004	0,0001	0,0002	0,0002	0,0022	0,0017	0,0002	0,0014	0,0052	0,0014	0,0003	0,0006	0,0009	0,0003	0,0072	0,0006	0,0006	0,0004	0,0009	0,0051	0,0005	0,0004	0,0151	0,0006	0,0024	0,0017	0,0015	0,0005	0,0027	0,0005	0,0003	0,0006	0,0046	0,0005	0,0027	0,0009	0,0008	0,0017	0,0008	0,0003	0,0007	0,0097	0,0004	0,0021	0,0026	0,0012	0,0073	0,0013	0,0007	0,0018	0,0039	0,0005	0,0004	0,0003	0,0009	0,0003	0,0004	0,0003	0	0,0009	0,0002	0,0003	0	0,0029`
const data = stringData.split('\t').map(item => parseFloat(item.replace(',','.')))

const matrix = []
for(let i=0;i<9;i++){
  let row = []
  for(let j=0;j<9;j++){
    row.push(data[i*9 + j])
  }
  matrix.push(row)
}

var connectedMatrix = JSON.parse(JSON.stringify(matrix))

function filterConnectedMatrix(){
  connectedMatrix[0][2] = 0
  connectedMatrix[0][5] = 0
  connectedMatrix[0][6] = 0
  connectedMatrix[0][7] = 0
  connectedMatrix[0][8] = 0

  connectedMatrix[1][6] = 0
  connectedMatrix[1][7] = 0
  connectedMatrix[1][8] = 0

  connectedMatrix[2][0] = 0
  connectedMatrix[2][3] = 0
  connectedMatrix[2][6] = 0
  connectedMatrix[2][7] = 0
  connectedMatrix[2][8] = 0

  connectedMatrix[3][2] = 0
  connectedMatrix[3][5] = 0
  connectedMatrix[3][8] = 0

  connectedMatrix[5][0] = 0
  connectedMatrix[5][3] = 0
  connectedMatrix[5][6] = 0

  connectedMatrix[6][0] = 0
  connectedMatrix[6][1] = 0
  connectedMatrix[6][2] = 0
  connectedMatrix[6][5] = 0
  connectedMatrix[6][8] = 0

  connectedMatrix[7][0] = 0
  connectedMatrix[7][1] = 0
  connectedMatrix[7][2] = 0

  connectedMatrix[8][0] = 0
  connectedMatrix[8][1] = 0
  connectedMatrix[8][2] = 0
  connectedMatrix[8][3] = 0
  connectedMatrix[8][6] = 0
}

filterConnectedMatrix()

function calcRowSum(m){
  const rowSum = []
  for(let i=0; i<9; i++){
    rowSum.push(m[i].reduce((a,b)=>a+b))
  }
  let s = ''
  rowSum.forEach(item=>s+=`${item.toFixed(4)}\t\t`)
  return rowSum.reduce((a,b)=>a+b)
}

function calcColumnSum(m){
  const columnSum = []
  for(let i=0;i<9;i++){
    let sum = 0
    for(let j=0; j<9;j++){
      sum+= m[j][i]
    }
    columnSum.push(sum)
  }
  let s = ''
  columnSum.forEach(item=>s+=`${item.toFixed(4)}\t\t`)
  return columnSum.reduce((a,b)=>a+b)
}

let rTotal = calcRowSum(connectedMatrix)
let cTotal = calcColumnSum(connectedMatrix)
console.log('[1, 2, 3, 4, 5, 6, 7, 8, 9] - Total: ', rTotal+cTotal)

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}

const combinations = permutator([0, 1, 2, 3, 4, 5, 6, 7, 8]) 
var BestScore = 0
var BestCombinations
console.log('Running all combinations...')
var total = 0

combinations.forEach(combination => {
  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      connectedMatrix[i][j] = matrix[combination[i]][combination[j]]
    }
  }
  filterConnectedMatrix()
  rTotal = calcRowSum(connectedMatrix)
  cTotal = calcColumnSum(connectedMatrix)
  total = (rTotal + cTotal).toFixed(4)
  if(total>BestScore){
    BestCombinations = [{combination, total}]
    BestScore = total
  }else if(total == BestScore){
    BestCombinations.push({combination, total})
  }
})

console.log('Finished calculations!')
console.log('Best Score: ', BestScore)
console.log('Total de combinations: ', combinations.length)

console.log('Best combinations:')

BestCombinations.forEach(item => {
  var string = ''
  item.combination.forEach((i) => {
    string += `${i+1} `
  })
  console.log(string)
})