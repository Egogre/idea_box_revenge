require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase

  test "index" do
    get :index, format: :json
    assert_response :success
  end

  test "returns number of ideas" do
    number_of_ideas = Idea.count

    get :index, format: :json
    json_response = JSON.parse(response.body)

    assert_equal number_of_ideas, json_response.count
  end
end
