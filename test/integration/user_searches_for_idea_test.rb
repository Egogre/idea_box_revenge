require 'test_helper'
require 'selenium-webdriver'

class UserSearchesForIdeaTest < Capybara::Rails::TestCase

  def setup
    super
    idea1 = Idea.create!( title: "Test1", body: "Things", quality: 2)
    idea2 = Idea.create!( title: "Test2", body: "Stuff", quality: 2)
    idea3 = Idea.create!( title: "Test3", body: "Thingsy")
    idea4 = Idea.create!( title: "Test4", body: "Stuffy", quality:1)

    visit '/'
  end

  test "user filters ideas by using search for body text" do
    fill_in('search', with: 'stuff')

    assert page.has_content?("Test2")
    assert page.has_content?("Test4")
    refute page.has_content?("Test1")
    refute page.has_content?("Test3")
  end

  test "user filters ideas by using search for title text" do
    fill_in('search', with: '2')

    assert page.has_content?("Test2")
    refute page.has_content?("Test4")
    refute page.has_content?("Test1")
    refute page.has_content?("Test3")
  end

  test "user filters ideas by using search for quality" do
    fill_in('search', with: 'genius')

    assert page.has_content?("Test1")
    assert page.has_content?("Test2")
    refute page.has_content?("Test3")
    refute page.has_content?("Test4")
  end

end
