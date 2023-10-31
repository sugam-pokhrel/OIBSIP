import React, { useState } from "react";
import CustomPizzaModal from "./CustomPizzaModal";

const CreateYourOwnPizzaOption = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style= {{height:'490px'}}key="uui" className="max-w-sm rounded-lg overflow-hidden shadow-lg create-your-own-pizza-option">
     {/* Added heading */}
      <img
        src="https://www.theboxprinters.com/wp-content/uploads/2021/05/2-10.jpg"  // Replace with your image URL
        alt="Create Your Own Pizza"
        className="w-[300px] h-[200px]" // Set width and height here
      />
       <h2 className="text-xl font-semibold m-4">Custom Options</h2> 
      <button className="create-pizza-button" onClick={openModal}>
        Create Your Own Pizza
      </button>
      <CustomPizzaModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default CreateYourOwnPizzaOption;
