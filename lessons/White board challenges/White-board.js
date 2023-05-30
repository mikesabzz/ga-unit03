// Find the greatest common divisor:

const greatestCD = (arr) => {
    for (let i = Math.min(...arr); i > 0; i--) {
        let divAll = true
    }
}

//solution:

//Find GCD in array of numbers

const greatestCF = (arr) => {
    for (let i = Math.min(...arr); i > 0; i--) {
        let divAll = true
        for (j = 0; j < arr.length; j++) {
            if (arr[j] % i !== 0) {
                divAll = false
            }
        }
        if (divAll === true) {
            console.log(i)
            return i
        }
    }
}

const arr1 = [6, 15, 30]
const arr2 = [7, 9]

greatestCF(arr2)