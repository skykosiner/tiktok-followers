export function isEmpty(obj: object): boolean {
    if (typeof (obj) !== "object") {
        return true
    }

    if (Object.keys(obj).length === 0) {
        return true
    }

    return false
}
