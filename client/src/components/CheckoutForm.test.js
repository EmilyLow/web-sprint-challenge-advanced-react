import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {

    render(<CheckoutForm/>);

});

test("form shows success message on submit with form details", () => {

    //Get form fields
    const {getByTestId, getByText} = render(<CheckoutForm/>);
    const submitButton = getByTestId('submit');

    //Fill out form


    //Submit form
    fireEvent.click(submitButton);



    //Check that result message is present
    //This works because if the above click is removed, the test fails. 
    getByText(/You have ordered some plants!/i);


});
