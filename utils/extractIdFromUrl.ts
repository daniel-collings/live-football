export default function extractIdFromUrl(url: string): string | null {
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];

        const idMatch = lastPart.match(/(\d+)$/);
        if (idMatch) {
            return idMatch[1];
        }

        return null;
}