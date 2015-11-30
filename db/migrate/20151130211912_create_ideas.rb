class CreateIdeas < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.string :title, null: false
      t.string :body, null: false
      t.integer :quality, default: 0

      t.timestamps null: false
    end
  end
end
