export function withoutNulls(arr) {
    if (arr && Array.isArray(arr)) {
        return arr.filter((item) => item != null)
    }
}