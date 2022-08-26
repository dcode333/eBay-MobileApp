import React from "react";
import Modal from "react-native-modal"; // 2.4.0
import FilterModalContent from "./FilterModalContent";
// import ModalStackNav from "../Navigation/ModalStackNav";

const FilterModal = ({ filterModal, setFilterModal }) => {
  return (
    <Modal
      isVisible={filterModal}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
    >
      <FilterModalContent setFilterModal={setFilterModal} />
    </Modal>
  );
};

export default FilterModal;
