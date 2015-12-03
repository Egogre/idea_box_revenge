require 'test_helper'
require 'selenium-webdriver'

class UserEditsIdeaTest < Capybara::Rails::TestCase

  test "user can edit idea" do
    idea1 = Idea.create!( title: "Test1", body: "Things")
    idea2 = Idea.create!( title: "Test2", body: "Stuff")
    visit "/"
    within(".idea#{idea2.id}") do
      click_on('edit')
      fill_in('edit-idea-title', with: 'New Title')
      fill_in('edit-idea-body', with: 'New Body')
      click_on('update')

      assert page.has_content?("New Title")
      assert page.has_content?("New Body")
    end

  end

end
