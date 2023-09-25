const checkDuplicates = (element, arr) => {
    let count = 0
    for (let index = 0; index < arr.length; index++) {
        if (element === arr[index]) {
            console.log(arr[index])
            count++
        }
    }
     console.log(count)
    if (count > 1) {
        return true
    }
    return false
}

export default checkDuplicates;