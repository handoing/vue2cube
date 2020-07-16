export default {
    data: function () {
        return { message: 'vue-cube' };
    }(),
    onLoad() {
        console.log('created');
    },
    onReady() {
        console.log('mounted');
    },
    onUnload() {
        console.log('destroyed');
    },
    reverseMessage: function () {
        this.setData({ message: this.data.message.split('').reverse().join('') });
    }
};