require 'test_helper'
require 'selenium-webdriver'

class UserDeletesIdeaTest < Capybara::Rails::TestCase

  def setup
    super
    Capybara.current_driver = Capybara.javascript_driver
  end

  def teardown
    super
    Capybara.current_driver = Capybara.default_driver
  end

  test "user can delete idea " do
    idea1 = Idea.create!( title: "Test1", body: "Things")
    idea2 = Idea.create!( title: "Test2", body: "Stuff")
    visit "/"

    within(".idea#{idea2.id}") do
      click_on('delete')
    end

    within('#ideas') do
      refute page.has_content?("Test2")
      refute page.has_content?("Stuff")
    end
  end

end
