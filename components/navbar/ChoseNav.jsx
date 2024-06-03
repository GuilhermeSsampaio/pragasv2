import React from "react";
import { Navbar } from "./Navbar";
import { NavbarHome } from "./NavbarHome";

const ChoseNav = ({ home }) => {
    return home ? <NavbarHome /> : <Navbar />;
};

export default ChoseNav;
