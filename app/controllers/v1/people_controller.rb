class V1::PeopleController < ApplicationController
  def index
    people = Person.all
    render json: people.as_json
  end

  def create
    person = Person.new(
      name: params[:name],
      bio: params[:bio]
    )
    person.save
    render json: person.as_json
  end

  def destroy
    person = Person.find_by(id: params[:id])
    person.destroy
    render json: {message: "you deleted the thing"}
  end
end
