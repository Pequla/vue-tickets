export default {
    getDestinationImageUrl(dest) {
        return 'https://img.pequla.com/destination/' + dest.toLowerCase().split(' ')[0] + '.jpg';
    }
}