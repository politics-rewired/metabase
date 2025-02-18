import { restore } from "__support__/e2e/cypress";
import { SAMPLE_DATASET } from "__support__/e2e/cypress_sample_dataset";

const { PRODUCTS } = SAMPLE_DATASET;

const question = {
  name: "19451",
  native: {
    query: "select count(*) from products where {{filter}}",
    "template-tags": {
      filter: {
        id: "1b33304a-18ea-cc77-083a-b5225954f200",
        name: "filter",
        "display-name": "Filter",
        type: "dimension",
        dimension: ["field", PRODUCTS.ID, null],
        "widget-type": "id",
        default: null,
      },
    },
  },
  display: "scalar",
};

describe("issue 19451", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();

    cy.createNativeQuestion(question).then(({ body: { id } }) => {
      cy.intercept("POST", `/api/card/${id}/query`).as("cardQuery");

      cy.visit(`/question/${id}`);
      cy.wait("@cardQuery");
    });
  });

  it("question field filter shows all tables from a selected database (metabase#19451)", () => {
    cy.findByText("Open Editor").click();
    cy.icon("variable").click();
    cy.findByText("Products").click();
    cy.icon("chevronleft").click();

    cy.findByText("Products");
    cy.findByText("Orders");
    cy.findByText("People");
    cy.findByText("Reviews");
  });
});
