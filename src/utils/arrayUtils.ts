export const shuffle = (array?: string[]): string[] => {
    var shuffleArr = array ?? []
    if (!shuffleArr.length) {
        return shuffleArr
    }
    for (var i = shuffleArr.length; 1 < i; i--) {
        const k = Math.floor(Math.random() * i)
        ;[shuffleArr[k], shuffleArr[i - 1]] = [shuffleArr[i - 1], shuffleArr[k]]
    }
    return shuffleArr
}
