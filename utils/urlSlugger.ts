export const stringToSlug = (str: string) => {
    return str.toLowerCase().replace(/\s+/g, '-');
}

export const slugToOriginal = (slug: string) => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
