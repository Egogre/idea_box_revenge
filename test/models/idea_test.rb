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

  test "idea quality can be upgraded" do
    better_idea = Idea.create(title: "Better Idea", body: "Justin Beaber punching bag!")
    better_idea.upgrade

    assert_equal "plausible", better_idea.quality

    better_idea.upgrade

    assert_equal "genius", better_idea.quality
  end

  test "idea quality can't be higher than genius" do
    super_genius_idea = Idea.create(title: "Better Idea", body: "Justin Beaber proof hearing protection!")
    super_genius_idea.upgrade
    super_genius_idea.upgrade

    assert_equal "genius", super_genius_idea.quality

    super_genius_idea.upgrade
    assert_equal "genius", super_genius_idea.quality
  end

  test "idea quality can be downgraded" do
    better_idea = Idea.create(title: "Better Idea", body: "Justin Beaber punching bag!")
    better_idea.upgrade
    better_idea.upgrade

    assert_equal "genius", better_idea.quality

    better_idea.downgrade

    assert_equal "plausible", better_idea.quality

    better_idea.downgrade

    assert_equal "swill", better_idea.quality
  end

  test "idea quality can't be lower than swill" do
    ultra_swill_idea = Idea.create(title: "Worse Than Swill Idea", body: "Justin Beaber amplifying headphones!")
    ultra_swill_idea.downgrade

    assert_equal "swill", ultra_swill_idea.quality
  end


end
