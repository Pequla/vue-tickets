export default {
    getDestinationImageUrl(dest) {
        try {
            return require('@/assets/img/destination/' + dest.toLowerCase().split(' ')[0] + '.jpg');
        } catch (error) {
            return require('@/assets/img/destination/default.jpg')
        }
    }
}