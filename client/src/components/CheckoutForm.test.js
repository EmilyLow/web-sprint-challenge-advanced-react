import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {

    render(<CheckoutForm/>);

});

test("form shows success message on submit with form details", () => {

    //Get form fields
    const {getByTestId, getByLabelText, getByText} = render(<CheckoutForm/>);
    const firstNameField = getByLabelText(/First name/i);
    const lastNameField = getByLabelText(/last name/i);
    const addressField = getByLabelText(/address/i);
    const cityField = getByLabelText(/city/i);
    const stateField = getByLabelText(/state/i);
    const zipField = getByLabelText(/zip/i);
    const submitButton = getByTestId('submit');

    //Fill out form
    userEvent.type(firstNameField, "John");
    userEvent.type(lastNameField, "Smith");
    userEvent.type(addressField, "12345 South Blvd.");
    userEvent.type(cityField, "New York City");
    userEvent.type(stateField, "NY");
    userEvent.type(zipField, "123456");

    //Submit form
    fireEvent.click(submitButton);



    //Check that result message is present
    //This works because if the above click is removed, the test fails. 
    getByText(/You have ordered some plants!/i);


});
