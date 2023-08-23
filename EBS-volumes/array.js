function call() {
    const arr = ["1a", "2v", "3x", "4f", "5r", "6", "7", "8", "9", "34we"];
    for (let i = 0; i < arr.length; i=i+3) {
        const take = arr.slice(i, i+3)
        console.log(take)
    }
}


call()
