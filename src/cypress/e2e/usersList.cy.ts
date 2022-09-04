/// <reference types="cypress" />
// Language: typescript
import { contains } from "underscore";


const url = "https://davidarebuwa.github.io/ten-x-demo/";

const FirstName = "John";
const LastName = "Doe";
const Email= "John@doe.com";
const imageLink = "www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"



describe("View List of users", () => {
  beforeEach(() => {
    cy.visit({ url });
  });


  it("should be able to view the page component", () => {
    cy.get("#header-left").within(() => {
      cy.get("#ten-x-logo").should("be.visible");
    });
    cy.get("#header-right").within(() => {
      //VERIFY THE THEME SWITCHER IS VISIBLE
      cy.get("[data-testid='Brightness4Icon']").should("be.visible");
    });
  });

  it("should be able to switch the theme from dark to light", () => {
    cy.get("#header-right").within(() => {
      //VERIFY THE THEME SWITCHER IS VISIBLE

      cy.get("[data-testid='Brightness4Icon']").click();
      cy.get("[data-testid='Brightness7Icon']").should("be.visible");
    });
  });

  it("should be able to view the list of users", () => {
    cy.get(".body").contains("Users");
    cy.get(".container").within(() => {
      //Verify the number of users in the list
      cy.get(
        "[class='MuiGrid2-root MuiGrid2-grid-xs-4 css-wvws5z']").should("have.length", 6);
    });
    //Verigy the delete and edit icons are visible 
    cy.get("[data-testid='EditIcon']").should("be.visible");
    cy.get("[data-testid='DeleteIcon']").should("be.visible");

  });


it('should be able to add a new user', () => {
addNewUser(FirstName, LastName, Email, imageLink);
//Verify that the new user is added to the list
cy.get(':nth-child(7) > .MuiPaper-root').click();
cy.get('.item-detail-header > .MuiTypography-root').should('have.text', 'Profile');
cy.get('.avatar-container').should('be.visible');
// Go back to the user list
cy.get('.back-button-container > .MuiButtonBase-root').click();

});

it('should be able to edit a user', () => {
//Click on the edit icon of the first user in the list
cy.get(':nth-child(1) > .MuiPaper-root').within(() => {
  cy.get('[data-testid="EditIcon"]').click();
});
//Verify that the edit user modal is displayed
cy.get('[class="MuiBox-root css-e8drjz"]').should('be.visible');
cy.get('form > .MuiTypography-root').should('have.text', 'Create/Update User');
//Edit the user details
cy.get('#first_name').clear().type('Jane');
cy.get('#last_name').clear().type('Doe');
cy.get('#email').clear().type('Jane@doe.com');
cy.get('.MuiButton-containedPrimary').contains('Submit').click();
cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardActionArea-root > .css-1t62lt9 > .MuiListItemText-root > .MuiTypography-body1').should('have.text', 'Jane Doe');
});




it('should be able to delete a user', () => {
  //Delete the user
  cy.get(':nth-child(1) > .MuiPaper-root').within(() => {
    cy.get('[data-testid="DeleteIcon"]').click();
  });
  //Verify that the delete user modal is displayed
cy.get('[role="dialog"]').should('be.visible');
cy.get('#alert-dialog-title').should('have.text', 'Delete User?');
cy.get('#alert-dialog-description').should('have.text', 'Please confirm if you would like to delete user from the system.');

cy.get('.MuiDialogActions-root').within(() => {
  cy.get('.MuiButton-textError').contains('Delete').should('be.visible');
  cy.get('.MuiButton-textPrimary').contains('Cancel').should('be.visible');
});
//Click on the delete button
cy.get('.MuiButton-textError').click();
//Verify that the user is deleted from the list and the list is updated
cy.get(
  "[class='MuiGrid2-root MuiGrid2-grid-xs-4 css-wvws5z']").should("have.length", 5);

  });
});








 function addNewUser(FirstName:string, LastName:string, Email:string, imageLink:string) {
    //Click on the add user button and verify that the add user form is visible
    cy.get('[aria-label="add"]').click();
    cy.get('.modal-form').should('be.visible');
    //Enter the user details and click on the save button
    cy.get('#first_name').type(FirstName);
    cy.get('#last_name').type(LastName);
    cy.get('#email').type(Email);
    cy.get('#avatar').type(imageLink);
    cy.get('.button-form-group > .MuiButton-containedPrimary').click();
 }

