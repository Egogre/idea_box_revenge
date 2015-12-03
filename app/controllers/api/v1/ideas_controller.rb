class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def update
    params[:idea][:quality] = params[:idea][:quality].to_i if params[:idea][:quality]
    respond_with :api, :v1, Idea.update(params[:id], idea_params)
  end

  def destroy
    respond_with :api, :v1, Idea.destroy(params[:id])
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end

end
