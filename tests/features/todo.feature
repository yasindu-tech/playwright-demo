Feature: Todo Application
  As a user
  I want to manage my todo list
  So that I can track my tasks

  Scenario: View existing todos on the homepage
    Given I open the Todo application
    Then I should see todo items listed on the page

  Scenario: Add a new todo item
    Given I open the Todo application
    When I type "Complete Playwright demo" in the input field
    And I click the Add button
    Then I should see "Complete Playwright demo" in the list
