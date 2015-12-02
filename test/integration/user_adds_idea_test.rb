require 'test_helper'
require 'selenium-webdriver'

class UserAddsIdeaTest < Capybara::Rails::TestCase

  def setup
    super
    Capybara.current_driver = Capybara.javascript_driver
  end

  def teardown
    super
    Capybara.current_driver = Capybara.default_driver
  end

  test "user can add idea with valid attributes" do
    Idea.create!( title: "Test2", body: "Stuff")

    visit "/"

    within('#add-idea') do
      fill_in('idea-title', with: 'Trial')
      fill_in('idea-body', with: 'Test Data')
      click_on('save')
    end

    within('#ideas') do
      assert page.has_content?("Trial")
      assert page.has_content?("Test Data")
      assert page.has_content?("swill")
    end
  end

end
