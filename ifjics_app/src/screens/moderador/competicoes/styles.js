const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;


export default {
    container: {
        backgroundColor: "#FFF"
    },
    text: {
        marginBottom: 7
    },
    mb: {
        marginBottom: 15
    },
    textMuted: {
        color:'#000', 
        opacity:.54,
    },
    actionButtonIcon: {
        fontSize: 20,
        color: 'white',
    }
};