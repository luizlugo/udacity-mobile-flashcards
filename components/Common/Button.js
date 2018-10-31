import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';
import { orange, red, white, gray, black, green} from '../../libs/colors';

const styles = StyleSheet.create({
    default: {
        alignSelf: 'stretch',
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: orange,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    danger: {
        backgroundColor: red,
    },
    success: {
        backgroundColor: green
    },
    text: {
        fontSize: 20,
        color: white
    },
    disabled: {
        backgroundColor: gray
    }
});

export default function Button({name, type, onPress, disabled}) {
    if (disabled) {
        return (
            <TouchableWithoutFeedback>
                <View style={[styles.default, styles.disabled]}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    } else {
        switch (type) {
            case 'danger':
                return (
                    <TouchableOpacity style={[styles.default, styles.danger]} onPress={onPress}>
                        <Text style={styles.text}>{name}</Text>
                    </TouchableOpacity>
                );
            case 'success':
                return (
                    <TouchableOpacity style={[styles.default, styles.success]} onPress={onPress}>
                        <Text style={styles.text}>{name}</Text>
                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity style={[styles.default]} onPress={onPress}>
                        <Text style={styles.text}>{name}</Text>
                    </TouchableOpacity>
                );
        }
    }
}