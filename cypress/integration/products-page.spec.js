describe("Products Page", () => {
  beforeEach(() => {
    cy.visit("/");
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
    cy.contains("Products");
  });

  it("should display the correct number of products", () => {
    cy.get('[data-testid="products-list"]').get('[data-testid^="product-"]').should("have.length", 20);
  });

  it("should navigate to the product page when clicking on a product", () => {
    cy.get('[data-testid="product-1"]').find('a').click();
    cy.location("pathname").should("eq", "/products/1");
  })
});
