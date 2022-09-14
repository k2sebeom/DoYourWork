import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { CenterModalProps } from "../@types/CenterModal.props";


const CenterModal = ({ children, visible }: CenterModalProps) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
        >
            <View style={styles.centerView}>
                <View style={styles.modalView}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default CenterModal;
