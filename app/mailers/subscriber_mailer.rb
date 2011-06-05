class SubscriberMailer < ActionMailer::Base
  default :from => "from@example.com"
  default :to => "jwarzech@gmail.com"
  
  def new_subscriber(subscriber)
    @subscriber = subscriber
    mail(:subject => "New User")
  end
end
