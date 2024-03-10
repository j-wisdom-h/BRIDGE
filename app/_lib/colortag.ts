const colorOptions: { [key: number]: string } = {
    0: 'bg-[#f7f37b]', // lightened lemon yellow
    1: 'bg-[#f5e591]', // lightened tangerine
    2: 'bg-[#87e7bb]', // lightened mint green
    3: 'bg-[#8de3f6]', // lightened sky blue
    4: 'bg-[#f2a990]', // lightened coral pink
    5: 'bg-[#f09783]', // lightened salmon pink
}

const getTagColor = (index: number): string => {
    const colors = Object.values(colorOptions)
    const calculatedColorIndex = index % colors.length
    const tagColor = colorOptions[calculatedColorIndex]
    return String(tagColor)
}

const colorTagStyles = (index: number) => {
    const tagColor = getTagColor(index)
    return `flex flex-row justify-between shrink-0 rounded-md ${tagColor} px-1.5 my-0.5 mr-1`
}

export { colorOptions, colorTagStyles, getTagColor }
