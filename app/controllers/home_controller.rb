class HomeController < ApplicationController
  before_filter :require_user, :only => :index
  
  caches_page :index
  
  def index
    @subscriber = Subscriber.new
    #SubscriberMailer.new_subscriber(@subscriber).deliver
  end
end
