describe("Layout", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
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

  it("should sidebar hidden by default", () => {
    cy.viewport("iphone-x");
    cy.wait(1000)
    cy.get('[data-testid="sidebar-sidemenu"]').should("not.exist");
  });

  it("should sidebar visible when clicking on menu", () => {
    cy.viewport("iphone-x");
    cy.wait(1000)
    cy.get('[data-testid="navbar-mobile-menu"]').click();
    cy.get('[data-testid="sidebar-sidemenu"]').should("exist");
  });

  it("should sidebar hidden when clicking on menu again", () => {
    cy.viewport("iphone-x");
    cy.wait(1000)
    cy.get('[data-testid="navbar-mobile-menu"]').click();
    cy.get('[data-testid="sidebar-sidemenu"]').should("exist");
    cy.get('[role="presentation"]').click("topRight");
    cy.get('[data-testid="sidebar-sidemenu"]').should("not.exist");
  });

  it("should menu icon not visible when not mobile", () => {
    cy.get('[data-testid="navbar-mobile-menu"]').should("not.visible");
  });

  it("should display the correct user name", () => {
    cy.get('[data-testid="sidebar-user-name"]').should("contain", "john doe");
  });

  it("should search autocomplete works", () => {
    cy.get('[data-testid="searchbar-button"]').click();
    cy.get('[data-testid="searchbar-autocomplete"]').click();
    cy.get('[role="presentation"]').contains("Mens").should("exist");
    cy.get('[data-testid="searchbar-autocomplete"]')
      .get("input")
      .type("Womens");
    cy.get('[role="presentation"]').contains("Womens").should("exist");
    cy.get('[role="presentation"]').contains("Mens").should("not.exist");
    cy.get('[role="presentation"]').contains("Womens").click();
    cy.location("pathname").should("eq", "/products/20");
  });

  it("should shopping cart popover works", () => {
    cy.get('[data-testid="shopping-cart-popover"]').then((item) => {
      cy.wrap(item).should("contain", "11");
      cy.wrap(item).click();
      cy.wrap(item)
        .get('[role="presentation"]')
        .then((presentation) => {
          cy.wrap(presentation)
            .get('[data-testid="shopping-cart-popover-quantity-1"]')
            .should("contain", "4");
          cy.wrap(presentation)
            .get('[data-testid="shopping-cart-popover-total"]')
            .should("contain", "798.04");
          cy.wrap(presentation)
            .get('[data-testid="shopping-cart-popover-remove-from-cart-1"]')
            .click();
          cy.wrap(presentation)
            .get('[data-testid="shopping-cart-popover-quantity-1"]')
            .should("contain", "3");
          cy.wrap(presentation)
            .get('[data-testid="shopping-cart-popover-total"]')
            .should("contain", "688.09");

          cy.intercept("PUT", "**/carts/**", {
            fixture: "cart-1.json",
          }).as("updateCart");

          cy.wait(2000);

          cy.get("@updateCart").then((xhr) => {
            expect(xhr.request.body.products[0].quantity).to.eq(3);
            expect(xhr.response.statusCode).to.eq(200);
          });

          cy.wrap(presentation)
            .get('[data-testid="shopping-cart-popover-view-cart"]')
            .click();

          cy.location("pathname").should("eq", "/shopping-cart");
        });
    });
  });
});
