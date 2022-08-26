import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal"; // 2.4.0

const AnimeModal = ({ animeModal, setAnimeModal }) => {
  return (
    <Modal
      isVisible={animeModal}
      backdropColor={"transparent"}
      backdropOpacity={1}
      animationIn={"zoomInDown"}
      animationOut={"zoomOutUp"}
      animationInTiming={1000}
      animationOutTiming={800}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={800}
    >
      <View style={styles.modalContent}>
        <Text>All the filters will be reseted</Text>
        <TouchableOpacity style={styles.popup} onPress={()=>{setAnimeModal(false)}}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AnimeModal;

const styles = StyleSheet.create({
  popup: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
  },
});
