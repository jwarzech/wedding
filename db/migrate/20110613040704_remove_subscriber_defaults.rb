class RemoveSubscriberDefaults < ActiveRecord::Migration
  def self.up
    change_column :subscribers, :will_attend_cd, :integer, :null => true
    change_column :subscribers, :staying_at_resort_cd, :integer, :null => true
    change_column :subscribers, :comment, :text, :null => true
  end

  def self.down
    change_column :subscribers, :will_attend_cd, :integer, :null => false
    change_column :subscribers, :staying_at_resort_cd, :integer, :null => false
    change_column :subscribers, :comment, :text, :null => false
  end
end