class HomeController < ApplicationController
  def index
    @subscriber = Subscriber.new
    #SubscriberMailer.new_subscriber(@subscriber).deliver
  end
end
