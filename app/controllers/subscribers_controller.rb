class SubscribersController < ApplicationController
  
  def create
    @subscriber = Subscriber.new(params[:subscriber])

    respond_to do |format|
      if @subscriber.save
        format.html { redirect_to(:root, :notice => 'Registration successfull.')  }
        format.xml  { render :xml => @subscriber, :status => :created, :location => @subscriber }
      else
        format.html { redirect_to(:root, :notice => 'Error: Make sure you fill out all fields')  }
        format.xml  { render :xml => @subscriber.errors, :status => :unprocessable_entity }
      end
    end
  end
  
end
