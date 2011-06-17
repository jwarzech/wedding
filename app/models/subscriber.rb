class Subscriber < ActiveRecord::Base
  as_enum :will_attend, {:definetly => 1, :not_sure => 2, :unable_to => 3}, :column => :will_attend_cd
  as_enum :staying_at_resort, {:yes => 1, :maybe => 2, :no => 3}, :column => :staying_at_resort_cd
end
