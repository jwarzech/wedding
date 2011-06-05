class CreateSubscribers < ActiveRecord::Migration
  def self.up
    create_table :subscribers do |t|
      t.string :name, :null => false
      t.string :email, :null => false
      t.integer :will_attend_cd, :null => false
      t.integer :staying_at_resort_cd, :null => false;
      t.text :comment, :null => false;
      t.timestamps
    end
  end

  def self.down
    drop_table :subscribers
  end
end
