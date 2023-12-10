import React from "react";
import ButtonMain from "../button-home";
import BasketTool from "../basket-tool";
import './style.css'

const Navbar = ({ onOpen, onPageChange, amount, sum }) => {
  return (
    <div className="navbar">
      <ButtonMain onPageChange={onPageChange} />
      <BasketTool onOpen={onOpen} amount={amount} sum={sum} />
    </div>
  );
};

export default Navbar;
