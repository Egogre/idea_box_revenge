
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/rails/capybara'
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

class Capybara::Rails::TestCase
  def setup
    super
    Capybara.current_driver = Capybara.javascript_driver
  end

  def teardown
    super
    Capybara.current_driver = Capybara.default_driver
  end
end

class ActiveSupport::TestCase
  self.use_transactional_fixtures = false

  def setup
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end

end
