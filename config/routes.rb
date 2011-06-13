Wedding::Application.routes.draw do
  root :to => 'home#index'
  #resources :users
  resources :subscribers
  resources :user_sessions, :only => [:new, :create, :destroy]
  match 'login' => 'user_sessions#new'
  match 'logout' => 'user_sessions#destroy'
end
