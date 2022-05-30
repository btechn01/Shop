describe("Product Page", () => {
  beforeEach(() => {
    cy.visit("/products/1");
    cy.intercept("GET", "**/users/**", {
      fixture: "user-1.json",
    }).as("getUser");

    cy.intercept("GET", "**/products", {
      fixture: "products.json",
    }).as("getProducts");

    cy.intercept("GET", "**/carts/user/**", {
      fixture: "carts-1.json",
    }).as("getUserCarts");

    cy.intercept("GET", "**/products/1", {
      fixture: "product-1.json",
    }).as("getProduct");
  });

  it("should display the correct title", () => {
    cy.get('[data-testid="product-title"]').should(
      "contain",
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );
  });

  it("should display the correct price", () => {
    cy.get('[data-testid="product-price"]').should("contain", "109.95");
  });

  it("should add, remove and quantities works", () => {
    cy.get('[data-testid="product-quantities"]').should("contain", "4");
    cy.get('[data-testid="product-add-to-cart"]').click();
    cy.get('[data-testid="product-quantities"]').should("contain", "5");
    cy.get('[data-testid="product-quantities"]').should("contain", "5");
    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid="product-remove-from-cart"]').click();
    }
    cy.get('[data-testid="product-add-to-cart-not-exist"]').should("exist");
    cy.get('[data-testid="product-quantities"]').should("not.exist");
    cy.get('[data-testid="product-add-to-cart-not-exist"]').click();
    cy.get('[data-testid="product-quantities"]').should("contain", "1");
    cy.get('[data-testid="product-add-to-cart-not-exist"]').should("not.exist");
  });
});
