require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase

  test "index" do
    get :index, format: :json
    assert_response :success
  end

  test "returns number of ideas" do
    Idea.create(title: "test1", body: "body1")
    Idea.create(title: "test2", body: "body2")
    number_of_ideas = Idea.count

    get :index, format: :json
    json_response = JSON.parse(response.body)

    assert_equal number_of_ideas, json_response.count
  end

  test "create" do
    new_idea = { title: "idea1", body: "very fun" }
    post :create, format: :json, idea: new_idea

    assert_response :created
    assert_equal "idea1", Idea.last.title
    assert_equal "very fun", Idea.last.body
  end

  test "doesn't create without title or body" do
    missing_title = { body: "very fun" }
    post :create, format: :json, idea: missing_title

    refute_equal :created, response.status

    missing_body = { title: "idea1" }
    post :create, format: :json, idea: missing_body

    refute_equal :created, response.status
  end
end
