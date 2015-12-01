require 'test_helper'

class IdeaBoxPageStaticDataTest < Capybara::Rails::TestCase

  test "user sees static data on root page" do
    visit '/'

    assert page.has_content?("Idea Box Revenge!")
  end

end
