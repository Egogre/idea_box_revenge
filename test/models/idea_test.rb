require 'test_helper'

class IdeaTest < ActiveSupport::TestCase

  test "create idea with valid attributes" do
    new_idea = Idea.new(title: "Hello", body: "World")

    assert new_idea.valid?
  end
end
