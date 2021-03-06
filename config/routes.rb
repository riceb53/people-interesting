Rails.application.routes.draw do
  namespace :v1 do
    get '/people' => 'people#index'
    post '/people' => 'people#create'
    delete '/people/:id' => 'people#destroy'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
