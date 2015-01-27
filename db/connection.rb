require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter  => "postgresql",
  :host     => "localhost",
  # :username => "changeme",
  # :password => "changeme",
  :database => "stories"
)

#log errors
ActiveRecord::Base.logger = Logger.new(STDOUT)