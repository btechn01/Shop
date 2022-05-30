describe("Shopping Cart Page", () => {
  beforeEach(() => {
    cy.visit("/shopping-cart");
    cy.intercept("GET", "**/users/**", {
      fixture: "user-1.json",
    }).as("getUser");

    cy.intercept("GET", "**/products", {
      fixture: "products.json",
    }).as("getProducts");

    cy.intercept("GET", "**/carts/user/**", {
      fixture: "carts-1.json",
    }).as("getUserCarts");
  });

  it("should display the correct title", () => {
    cy.contains("Shopping Cart");
  });

  it("should display the correct number of products", () => {
    cy.get('[data-testid="shopping-cart-product-list"]')
      .find("li")
      .should("have.length", 3);
  });

  it("should add and remove products works", () => {
    cy.get('[data-testid="shopping-cart-product-price-1"]').should(
      "contain",
      "439.8"
    );
    cy.get('[data-testid="shopping-cart-remove-product-1"]').click();
    cy.get('[data-testid="shopping-cart-product-price-1"]').should(
      "contain",
      "329.85"
    );
    cy.get('[data-testid="shopping-cart-product-price-3"]').should(
      "contain",
      "335.94"
    );
    cy.get('[data-testid="shopping-cart-add-product-3"]').click();
    cy.get('[data-testid="shopping-cart-product-price-3"]').should(
      "contain",
      "391.93"
    );
    cy.get('[data-testid="shopping-cart-total"]').should("contain", "744.08");
  });
  
  it("should navigate to the products page when clicking on Continue Shopping", () => {
    cy.get('[data-testid="shopping-cart-continue-shopping"]').click();
    cy.location("pathname").should("eq", "/");
  });
});
