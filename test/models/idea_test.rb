require 'test_helper'

class IdeaTest < ActiveSupport::TestCase

  test "create idea with valid attributes" do
    new_idea = Idea.new(title: "Hello", body: "World")
    starting_count = Idea.all.count

    assert new_idea.valid?

    new_idea.save

    assert_equal starting_count + 1, Idea.all.count
  end

  test "idea is swill by default" do
    swill_idea = Idea.create(title: "Swill Idea", body: "Justin Beaber dolls!")

    assert_equal "swill", swill_idea.quality
  end

  test "idea is invalid without title or body" do
    no_title = Idea.new(body: "World")
    no_body = Idea.new(title: "Hello")

    refute no_title.valid?
    refute no_body.valid?
  end

end
