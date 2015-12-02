require 'test_helper'
require 'selenium-webdriver'

class UserChangesIdeaQualityTest < Capybara::Rails::TestCase

  def setup
    super
    Capybara.current_driver = Capybara.javascript_driver
  end

  def teardown
    super
    Capybara.current_driver = Capybara.default_driver
  end

  test "user can upgrade idea " do
    idea1 = Idea.create!( title: "Test1", body: "Things")
    idea2 = Idea.create!( title: "Test2", body: "Stuff")
    visit "/"

    within(".idea#{idea2.id}") do
      click_on('thumbs up')

      assert page.has_content?("plausible")

      click_on('thumbs up')

      assert page.has_content?("genius")
    end

    within(".idea#{idea1.id}") do
      assert page.has_content?("swill")
      refute page.has_content?("genius")
      refute page.has_content?("plausible")
    end
  end

  test "user can't upgrade idea beyond genius" do
    idea1 = Idea.create!( title: "Test1", body: "Things")
    idea2 = Idea.create!( title: "Test2", body: "Stuff", quality: 2)
    visit "/"

    within(".idea#{idea2.id}") do
      click_on('thumbs up')

      assert page.has_content?("genius")
    end
  end

  test "user can downgrade idea " do
    idea1 = Idea.create!( title: "Test1", body: "Things")
    idea2 = Idea.create!( title: "Test2", body: "Stuff", quality: 2)
    visit "/"

    within(".idea#{idea2.id}") do
      click_on('thumbs down')

      assert page.has_content?("plausible")

      click_on('thumbs down')

      assert page.has_content?("swill")
    end
  end

  test "user can't downgrade idea below swill" do
    idea1 = Idea.create!( title: "Test1", body: "Things")
    idea2 = Idea.create!( title: "Test2", body: "Stuff", quality: 2)
    visit "/"

    within(".idea#{idea1.id}") do
      click_on('thumbs down')

      assert page.has_content?("swill")
    end
  end
end
