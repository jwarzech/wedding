source 'http://rubygems.org'

gem 'rails', '3.0.8'
gem 'rake', '0.8.7'

# https://github.com/lwe/simple_enum
gem 'simple_enum', '~> 1.3.2'

# https://github.com/fesplugas/typus
gem 'typus', :git => 'git://github.com/fesplugas/typus.git'

# https://github.com/binarylogic/authlogic_example
gem 'authlogic'

group :development, :test do
  gem 'sqlite3'
end

group :production, staging do
  gem 'pg'
  gem 'thin'
end