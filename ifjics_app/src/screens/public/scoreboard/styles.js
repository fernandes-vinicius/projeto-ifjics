const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
    container: {
        backgroundColor: "#FFF"
    },
    text: {
        fontSize: 12,
    },
    title: {
        fontSize: 15,
    },
    mb: {
        marginBottom: 15
    },
    textMuted: {
        color: '#000',
        opacity: .54,
    },
    actionButtonIcon: {
        fontSize: 20,
        color: 'white',
    },
    grid: {
    },
    col: {
        width: deviceHeight / 4,
        paddingTop: 5,
        paddingBottom: 5,
    },
    row: {
    },
};