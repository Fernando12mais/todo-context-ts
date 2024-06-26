const successClass = "MuiSvgIcon-colorSuccess";
const doneColor = "rgba(0, 0, 0, 0)";
const regexToValidateLineThrough = /line-through/;

describe("Should cover all functionalities from the todo list app in desktop environment", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("macbook-16");
  });
  it("Should create a new item and add it on top of the list", () => {
    const newTask = "new task";
    cy.getByDataCy("btn-add").click();
    cy.getByDataCy("input-create-task").type(newTask);
    cy.getByDataCy("btn-check").click();
    cy.get("tbody tr td").eq(1).should("have.text", newTask);
  });

  it("Should show an error message when the input is invalid", () => {
    const newTask = "n";
    cy.getByDataCy("btn-add").click();
    cy.getByDataCy("input-create-task").type(newTask);
    cy.getByDataCy("error-create-task").should("be.visible");
  });

  it("Should delete a task", () => {
    cy.get("tbody tr td")
      .eq(1)
      .then((el) => {
        const text = el.text();
        cy.getByDataCy("btn-delete").first().click();
        cy.get("tbody tr td").each((td) => {
          expect(td.text()).not.equal(text);
        });
      });
  });

  it("Should delete all tasks", () => {
    cy.get("tbody tr td").each((el, index) => {
      if (index == 0) {
        cy.getByDataCy("btn-delete-all").click();
        cy.getByDataCy("btn-confirm-delete-all").click();
      }
      cy.wrap(el).should("not.exist");
    });
  });

  it("Should edit a task", () => {
    const updateText = "task updated";
    cy.getByDataCy("btn-edit").first().click();
    cy.getByDataCy("input-create-task").find("input").clear().type(updateText);
    cy.getByDataCy("btn-check").click();
    cy.get("tbody tr td").eq(1).should("have.text", updateText);
  });

  it("Should filter tasks based on search", () => {
    cy.get("tbody tr td")
      .eq(1)
      .then((el) => {
        const text = el.text();
        cy.get("input[aria-label='Search']").type(text);
        cy.wait(500);
        cy.get("tbody tr td").each((el) => {
          const elText = el.text();
          if (elText) expect(elText).to.include(text);
        });
      });
  });

  it("Should mark an item as done", () => {
    cy.getByDataCy("btn-done").first().click();
    cy.getByDataCy("btn-done").each((el) => {
      cy.wrap(el)
        .invoke("attr", "class")
        .then((name) => {
          if (!name.includes(successClass)) return;

          cy.wrap(el.parents().eq(3))
            .find("td")
            .eq(1)
            .should("have.css", "text-decoration")
            .and("match", regexToValidateLineThrough);
        });
    });
  });
});

describe("Should cover all functionalities from the todo list app in mobile environment", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("iphone-6");
  });

  it("Should create a new item and add it on top of the list", () => {
    const newTask = "new task";
    cy.getByDataCy("btn-add-task").click();
    cy.getByDataCy("input-create-task").type(newTask);
    cy.getByDataCy("btn-submit").click();
    cy.getByDataCy("card-row-0").should("have.text", newTask);
  });

  it("Should show an error message when the input is invalid", () => {
    const newTask = "n";
    cy.getByDataCy("btn-add-task").click();
    cy.getByDataCy("input-create-task").type(newTask);
    cy.getByDataCy("btn-submit").click();
    cy.getByDataCy("error-create-task").should("be.visible");
  });

  it("should delete a task", () => {
    cy.getByDataCy("card-row-0").then((el) => {
      cy.getByDataCy("btn-delete").first().click();
      cy.wait(500).then(() => expect(el).to.not.exist);
    });
  });

  it("Should delete all tasks", () => {
    cy.get("[data-cy*='card-row']").each((el, index) => {
      if (index == 0) {
        cy.getByDataCy("btn-delete-all").click();
        cy.getByDataCy("btn-confirm-delete-all").click();
      }
      cy.wrap(el).should("not.exist");
    });
  });

  it("Should edit a task", () => {
    const updatedText = "updatedTask";
    cy.getByDataCy("btn-edit").first().click();
    cy.getByDataCy("input-create-task").find("input").clear().type(updatedText);
    cy.getByDataCy("btn-submit").click();
    cy.getByDataCy("card-row-0").should("have.text", updatedText);
  });

  it("Should filter tasks based on search", () => {
    cy.getByDataCy("card-row-0").then((el) => {
      const text = el.text();
      cy.getByDataCy("input-search").type(text);
      cy.wait(500);
      cy.get("[data-cy*='card-row']").each((el) => {
        if (el.text()) expect(el.text()).to.include(text);
      });
    });
  });

  it("should mark an item as done", () => {
    cy.getByDataCy("card-row-0").then((el) => {
      cy.getByDataCy("btn-done").first().click();

      cy.wrap(el)
        .find("span")
        .first()
        .should("have.css", "text-decoration")
        .and("match", regexToValidateLineThrough);
      cy.wrap(el)
        .find("span")
        .first()
        .should("have.css", "background-color", doneColor);

      cy.getByDataCy("btn-done").should("have.class", successClass);
    });
  });
});
