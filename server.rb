require 'sinatra'
require 'json'
require 'pry'
require_relative './db/connection'
require_relative './lib/entry'



get "/" do 
	File.read("./views/index.html")
end

post "/entries" do 
	new_entry = Entry.create({contents: params["value"]})
	new_entry.to_json
end




after { ActiveRecord::Base.connection.close }
