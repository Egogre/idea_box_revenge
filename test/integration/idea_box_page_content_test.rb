require 'test_helper'
require 'selenium-webdriver'

class IdeaBoxPageContentTest < Capybara::Rails::TestCase

  def setup
    super
    Capybara.current_driver = Capybara.javascript_driver
  end

  def teardown
    super
    Capybara.current_driver = Capybara.default_driver
  end

  test "user sees static data on root page" do
    visit '/'

    assert page.has_content?("Idea Box Revenge!")
  end

  test "user sees idea list" do
    idea = Idea.create( title: "Test1", body: "Good Times", quality: 2)
    Idea.create( title: "Test2", body: "Stuff")
    visit '/'
    
    within('#ideas') do
      assert page.has_content?("Test1")
      assert page.has_content?("Good Times")
      assert page.has_content?("genius")
      assert page.has_content?("Test2")
      assert page.has_content?("Stuff")
      assert page.has_content?("swill")
    end
  end

end
