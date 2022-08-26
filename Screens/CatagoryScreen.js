import React from "react";


import HorizantalListItem from "../Screen_Components/CatagoryScreen_Components/HorizantalListItem";
import VerticalListItem from "../Screen_Components/CatagoryScreen_Components/VerticalListItem";
import CatagoryDisplay from "../Screen_Components/CatagoryScreen_Components/CatagoryDisplay";

export default function CatagoryScreen({route}) {
  const {title,CatagoryScreenData}=route.params;
  return (
    <CatagoryDisplay
      HorizantalListItem={HorizantalListItem}
      VerticalListItem={VerticalListItem}
      CatagoryScreenData={CatagoryScreenData}
      title={title}
    />
  );
}
