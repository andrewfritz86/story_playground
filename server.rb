require 'sinatra'
require 'json'
require 'pry'
require_relative './db/connection'
require_relative './lib/entry'



get "/" do 
	File.read("./views/index.html")
end




after { ActiveRecord::Base.connection.close }
