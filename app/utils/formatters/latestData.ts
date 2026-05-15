export function latestData(number: number, data: any) {
    const reverseData = data.reverse()
    const startIndex = Math.max(reverseData.length - number, 0);
    return reverseData.slice(startIndex);
};