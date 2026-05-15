export function iconsBook(str: string) {
    switch (true) {
        case str === 'Audiobook':
            return "material-symbols:headphones-rounded"
            break
        case str === 'Printed':
            return "material-symbols:book-5-rounded";
            break
        case str === 'Ebook':
            return "material-symbols:fullscreen-portrait-outline";
            break
        default:
            return 'material-symbols:book-5-rounded';
    }
};