function max(list) {
    if (list.length === 2) {
        return list[0] > list[1] ? list[0] : list[1]
    } else {
        return list[0] > max(list.slice(1)) ? list[0] : max(list.slice(1))
    }
}
let list = [1, 3, 9, 7, 5]
console.log(max(list))